import miio from 'miio'

export const Type = {
  Gateway: {},
  Vacuum: {},
  Light: {}
}

export function LogError (err, device) {
  device.connection = null
  console.error('Error with', device.name, err)
  return { name: device.name, err }
}

export function GenericRespose (res, promise) {
  promise
    .then(promises => promises instanceof Array ? Promise.all(promises) : promises)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
}

const DeviceList = [
  { ip: '10.0.0.11', type: Type.Vacuum, name: 'yang' },
  { ip: '10.0.0.12', type: Type.Light, name: 'bedroom' },
  { ip: '10.0.0.13', type: Type.Light, name: 'living room' },
  { ip: '10.0.0.14', type: Type.Light, name: 'bathroom' },
  { ip: '10.0.0.15', type: Type.Light, name: 'workroom' }
]

export default async function Connect (type) {
  await Promise.all(DeviceList
    .filter(device => (device.type === type || !type) && !device.connection)
    .map(async device => {
      console.log('Connecting with ', device.name)
      await miio.device({ address: device.ip })
        .then(connection => {
          device.connection = connection
          console.log('Connected with ', device.name, device.ip)
        })
        .catch(err => LogError(err, device))
      return device
    })
  )

  return DeviceList.filter(device => (device.type === type || !type) && device.connection)
}
