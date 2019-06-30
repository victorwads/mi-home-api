import homeServices from '@helpers/home-services'

export default {
  cleanZone: (req, res) => {
    const { zone, repeats } = req.body

    homeServices.callService('vacuum', 'xiaomi_clean_zone', {
      "entity_id": "vacuum.xiaomi_vacuum_cleaner",
      "repeats": repeats,
      "zone": homeServices.getZone(zone)
    }).then(response => {
      res.status(200).json({ status: 'cleaning' })
    })

  },
  stop: (req, res) => {
    homeServices.callService('vacuum', 'stop', {
      "entity_id": "vacuum.xiaomi_vacuum_cleaner",
    }).then(response => {
      res.status(200).json({ status: 'cleaning' })
    })
  },
  listZones: (req, res) => {
    res.status(404).json(homeServices.zones)
  }
}
