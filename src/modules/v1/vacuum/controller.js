import homeServices from '@helpers/home-services'

const entity_id = "vacuum.xiaomi_vacuum_cleaner"
const fan_speed_list = {
  quiet: 'Quiet',
  balanced: 'Balanced',
  turbo: 'Turbo',
  max: 'Max'
}

let alias_zones
{
  let lucabedroom = [[24200, 27350, 26600, 31300]]
  let kitchen = [[21950, 33300, 26500, 35000]]
  let livingroom = [[22000, 29850, 26000, 33100]]
  let hall = [[23200, 26000, 24100, 29950]]
  let bedroom = [
    [23200, 26000, 24200, 26500],
    [22900, 23500, 26000, 26000]
  ]
  alias_zones = {
    lucabedroom,
    kitchen,
    livingroom,
    hall,
    bedroom,
    susiemess: livingroom,
    victorbedroom: bedroom
  }
}

function getZone(name) {
  name = name.toLowerCase()
    .replace(/(up the |the |up my |my |s )/, '')
    .replace(/[^a-z]*/g, '')
  console.log(name)
  return alias_zones[name]
}

async function getStatus() {
  return await homeServices.getStatus(entity_id)
}

async function setSpeed(speed) {
  return await homeServices.callService('vacuum', 'set_fan_speed', entity_id, {
    fan_speed: fan_speed_list[speed.toLowerCase()]
  })
}

export default {
  cleanZone: (req, res) => {
    const { zone, repeats, speed } = req.body

    if (speed)
      setSpeed(speed)

    homeServices.callService('vacuum', 'xiaomi_clean_zone', entity_id, {
      "repeats": repeats,
      "zone": getZone(zone)
    }).then(response => {
      res.status(200).json({ status: `cleaning ${zone}` })
    })

  },
  stop: async (req, res) => {

    const status = await getStatus()
    if (status.state == "returning")
      await homeServices.callService('vacuum', 'pause', entity_id)
//    else if (status.state == "docked" || status.state == "idle")
//      return res.status(200).json({ status: 'stoped' })

    homeServices.callService('vacuum', 'stop', entity_id)
      .then(response =>
        res.status(200).json({ status: 'stoping' })
      )
  },
  dock: (req, res) =>
    homeServices.callService('vacuum', 'return_to_base', entity_id)
      .then(response =>
        res.status(200).json({ status: 'going back' })
      )
  ,
  setSpeed: (req, res) => {
    const { speed } = req.body

    setSpeed(speed).then(async response =>
      res.status(200).json(await response.json())
    )
  },
  status: (req, res) =>
    getStatus().then(response =>
      res.status(200).json(response)
    )
  ,
  zones: (req, res) =>
    res.status(200).json(alias_zones)
}
