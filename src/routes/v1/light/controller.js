import miio from 'miio'
import { color as Color } from 'abstract-things/values'

const Lights = [
    { name: 'victor', ip: '10.0.0.12', device: null, error: false },
    { name: 'living room', ip: '10.0.0.13', device: null, error: false }
]

async function Connect() {
    const promises = Lights
        .filter(light => light.error || light.device === null)
        .map(async light => {
            console.log('Connecting with ', light.name)
            return miio.device({ address: light.ip })
                .then(device => light.device = device)
                .catch(err => {
                    Light.Devices[i] = null
                    logErr(err)
                })
        })
    return Promise.all(promises)
}
function logErr(err) {
    console.log(err)
}

async function Light(name) {
    await Connect()
    return Lights
        .filter(light => !light.error && light.device !== null && (!name || light.name === name))
        .map(light => light.device)
}

async function getStatus(name) {
    return await Light(name)
        .then(list => list.map(device => device._properties))
}
Connect()

const controller = {
    status: (req, res) => {
        getStatus(req.params.name)
            .then(status => res.status(200).json(status))
            .catch(err => logErr(err), res.status(500).json({ err }))
    },

    toggle: async (req, res) => Light(req.params.name)
        .then(list => list.map(light => light
            .changePower(!light._properties.power).catch(logErr)
        ))
        .then(result => res.status(200).json(result))
    ,

    generic: function (action, msg, args = []) {
        return (req, res) => Light(req.params.name)
            .then(list => list.map(light =>
                light[action](...args).catch(logErr)
            ))
            .then(result => res.status(200).json(result))
    },

    color: (req, res) => {
        const { color, duration } = req.body

        Light(req.params.name)
            .then(list => list.map(light => light
                .changeColor(
                    Color(color, 'rgb'), { duration: duration || 500 }
                ).catch(logErr)
            ))
            .then(result => res.status(200).json(result))
    },
}

export default controller