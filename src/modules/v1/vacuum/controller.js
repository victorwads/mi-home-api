
export default {
  cleanZone: (req, res) => {
    const { zone, repeats } = req.body
    console.log(zone, repeats)

    res.status(200).json({ status: 'cleaning' })
  },
  listZones: (req, res) => {
    res.status(404).json({ status: 'Developing' })
  }
}
