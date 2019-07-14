import homeServices from '@helpers/home-services'

const entityId = 'vacuum.xiaomi_vacuum_cleaner'
const fanSpeedList = {
  quiet: 'Quiet',
  balanced: 'Balanced',
  turbo: 'Turbo',
  max: 'Max'
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
  return homeServices.getStatus(entityId)
}

async function setSpeed(speed) {
  return homeServices.callService('vacuum', 'set_fan_speed', entityId, {
    fan_speed: fanSpeedList[speed.toLowerCase()]
  })
}

export default {
  cleanZone: (req, res) => {
    const { zone, repeats, speed } = req.body

    let coords = getZone(zone)
    if (coords === undefined || coords.length === 0) {
      res.status(200).json({ error: `${zone} do not exists` })
    }

    if (speed) { setSpeed(speed) }

    homeServices.callService('vacuum', 'xiaomi_clean_zone', entityId, {
      'repeats': repeats,
      'zone': coords
    }).then(response => {
      res.status(200).json({ status: `cleaning ${zone}` })
    })
  },
  stop: async (req, res) => {
    const status = await getStatus()
    if (status.state === 'returning') { await homeServices.callService('vacuum', 'pause', entityId) }

    homeServices.callService('vacuum', 'stop', entityId)
      .then(response =>
        res.status(200).json({ status: 'stoping' })
      )
  },
  dock: (req, res) =>
    homeServices.callService('vacuum', 'return_to_base', entityId)
      .then(response =>
        res.status(200).json({ status: 'going back' })
      ),
  setSpeed: (req, res) => {
    const { speed } = req.body

    setSpeed(speed).then(response =>
      res.status(200).json(response)
    )
  },
  status: (req, res) =>
    getStatus().then(response =>
      res.status(200).json(response)
    ),
  zones: (req, res) =>
    res.status(200).json(aliasZones)
}
