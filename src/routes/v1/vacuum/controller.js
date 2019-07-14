import miio from 'miio'

async function Vacuum() {
  await Vacuum.Connect
  console.log(JSON.stringify(Vacuum.Device, null, 2))
  return Vacuum.Device
}
Vacuum.Connect = miio.device({ address: '10.0.0.11' })
  .then(device => Vacuum.Device = device)


const fanSpeedList = {
  quiet: 38,
  balanced: 60,
  turbo: 77,
  max: 100
}

let aliasZones
{
  let lucabedroom = [[24200, 27350, 26600, 31300]]
  let kitchen = [[21950, 33300, 26500, 35000]]
  let livingroom = [[22000, 29850, 26000, 33100]]
  let hall = [[23200, 26000, 24100, 29950]]
  let bedroom = [
    [23200, 26000, 24200, 26500],
    [22900, 23500, 26000, 26000]
  ]
  aliasZones = {
    lucabedroom,
    kitchen,
    livingroom,
    hall,
    bedroom,
    susiemes: livingroom,
    susiemess: livingroom,
    victorbedroom: bedroom
  }
}

function getZone(name) {
  name = name.toLowerCase()
    .replace(/ room/g, 'room')
    .replace(/ and /g, ' ')
    .replace(/(up the |the |up my |my |s )/g, '')
    .replace(/[^a-z ]*/g, '')

  const coords = []
  let names = name.split(' ')

  names.forEach(name => {
    let zoneCoords = aliasZones[name]

    if (zoneCoords instanceof Array)
      zoneCoords.forEach(element => coords.push(element))
  })

  return coords
}

async function getStatus() {
  return (await Vacuum())._properties
}

async function setSpeed(speed) {
  return Vacuum()
    .then(d => d.changeFanSpeed(fanSpeedList[speed.toLowerCase()] || speed))
}

const controler = {
  cleanZone: (req, res) => {
    const { zone, repeats, speed } = req.body

    let coords = getZone(zone)
    if (coords === undefined || coords.length === 0) {
      return res.status(200).json({ error: `${zone} do not exists` })
    }
    if (speed) { setSpeed(speed) }

    for (let i = 0; i < coords.length; i++) {
      const zone = coords[i];
      if (zone.length === 4)
        zone.push(repeats)
    }

    return Vacuum()
      .then(d => d.activateZoneClean(coords))
      .then(() => res.status(200).json({ status: `cleaning ${zone}` }))
      .catch(err => res.status(500).json({ err }))
  },

  stop: async (req, res) => {
    const status = await getStatus()
    if (status.state === 'returning') {
      await Vacuum().then(d => d.pause())
    }
    return controler.generic('deactivateCleaning', 'stoped')(req, res)
  },

  generic: function (action, msg) {
    return async (req, res) => {
      return Vacuum()
        .then(d => d[action]())
        .then(() => res.status(200).json({ status: msg }))
        .catch(err => res.status(500).json({ err }))
    }
  },

  setSpeed: (req, res) => {
    const { speed } = req.body

    setSpeed(speed)
      .then(response => res.status(200).json(response))
      .catch(err => res.status(500).json({ err }))
  },

  status: (req, res) => getStatus()
    .then(status => res.status(200).json(status))
    .catch(err => res.status(500).json({ err }))
  ,

  zones: (req, res) =>
    res.status(200).json(aliasZones)
}

export default controler