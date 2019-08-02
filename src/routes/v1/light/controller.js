import { color as Color } from 'abstract-things/values'
import Connect, { Type, LogError, GenericRespose } from '../../../modules/miio-connect'

async function Light (name) {
  return (await Connect(Type.Light))
    .filter(light => !name || light.name === name)
}

async function getStatus (name) {
  return Light(name)
    .then(list => list.map(device => device.connection._properties))
}

const controller = {
  status: (req, res) => GenericRespose(
    res,
    getStatus(req.params.name)
  ),

  toggle: (req, res) => GenericRespose(
    res,
    Light(req.params.name)
      .then(list => list.map(async light => {
        try {
          const power = !light.connection._properties.power
          await light.connection.changePower(power)
          return { name: light.name, msg: 'turned ' + (power ? 'on' : 'off') }
        } catch (err) {
          return LogError(err, light)
        }
      }))
  ),

  generic: function (action, msg, args = []) {
    return (req, res) => GenericRespose(
      res,
      Light(req.params.name)
        .then(list => list.map(async light => {
          try {
            await light.connection[action](...args)
            return { name: light.name, msg }
          } catch (err) {
            return LogError(err, light)
          }
        }))
    )
  },

  color: (req, res) => {
    const { color, duration } = req.body
    const args = [Color(color, 'rgb'), { duration: duration || 500 }]

    controller.generic('changeColor', 'color changed to ' + color, args)(req, res)
  },

  brightness: (req, res) => {
    const { value, duration } = req.body
    const args = [parseInt(value), { powerOn: true, duration }]

    controller.generic('changeBrightness', 'brightness changed to ' + value, args)(req, res)
  },

  temperature: (req, res) => {
    const { value, duration } = req.body
    const args = [Color(value + 'k', 'temperature'), { duration }]

    controller.generic('changeColor', 'color changed to ' + value, args)(req, res)
  }
}

export default controller
