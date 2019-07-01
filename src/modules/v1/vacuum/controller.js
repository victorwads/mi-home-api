import homeServices from '@helpers/home-services'

const fan_speed_list = {
  quiet: 'Quiet',
  balanced: 'Balanced',
  turbo: 'Turbo',
  max: 'Max'
}

let alias_zones
{
  let lucasbedroom = [[24200, 27300, 26600, 30000]]
  let kitchen = [[21950, 33300, 26500, 35000]]
  let livingroom = [[22000, 29850, 26000, 33100]]
  let hall = [[23200, 26000, 24100, 29950]]
  let bedroom = [
    [23200, 26000, 24200, 26500],
    [22900, 23500, 26000, 26000]
  ]
  alias_zones = {
    lucabedroom: lucasbedroom,
    lucasbedroom,
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

function getStatus() {
  return homeServices.getStatus('vacuum.xiaomi_vacuum_cleaner')
}

function setSpeed(speed) {
  homeServices.setStatus('vacuum.xiaomi_vacuum_cleaner', {
    attributes: {
      fan_speed: fan_speed_list[speed]
    }
  })
}

export default {
  cleanZone: (req, res) => {
    const { zone, repeats } = req.body

    homeServices.callService('vacuum', 'xiaomi_clean_zone', 'vacuum.xiaomi_vacuum_cleaner', {
      "repeats": repeats,
      "zone": getZone(zone)
    }).then(response => {
      res.status(200).json({ status: 'cleaning' })
    })

  },
  stop: async (req, res) => {
    await homeServices.callService('vacuum', 'pause', 'vacuum.xiaomi_vacuum_cleaner')
    homeServices.callService('vacuum', 'stop', 'vacuum.xiaomi_vacuum_cleaner')
      .then(response =>
        res.status(200).json({ status: 'stoping' })
      )
  },
  dock: (req, res) =>
    homeServices.callService('vacuum', 'return_to_base', 'vacuum.xiaomi_vacuum_cleaner')
      .then(response =>
        res.status(200).json({ status: 'going back' })
      )
  ,
  setSpeed: (req, res) => {
    const { speed } = req.body

    setSpeed(speed).then(response =>
      res.status(200).json(response)
    )
  },
  status: (req, res) =>
    getStatus().then(response =>
      res.status(200).json(response)
    )
  ,
  zones: (req, res) =>
    res.status(200).json(homeServices.zones)
}
