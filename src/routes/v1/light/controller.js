import miio from 'miio'
import { color as Color } from 'abstract-things/values'

const Lights = [
    { name: 'victor', ip: '10.0.0.12', device: null },
    { name: 'living room', ip: '10.0.0.13', device: null }
]

async function Connect() {
    const promises = Lights
        .filter(light => light.device === null)
        .map(async light => {
            console.log('Connecting with ', light.name)
            return miio.device({ address: light.ip })
                .then(device => light.device = device)
                .catch(err => logErr(err, light))
        })
    return Promise.all(promises)
}
function logErr(err, light) {
    console.log(err)
    light.device = null
}

async function Light(name) {
    await Connect()
    return Lights
        .filter(light => light.device !== null && (!name || light.name === name))
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
            .catch(err => res.status(500).json({ err }))
    },

    toggle: async (req, res) => Light(req.params.name)
        .then(list => list.map(light => light
            .changePower(!light._properties.power).catch(logErr, light)
        ))
        .then(result => res.status(200).json(result))
    ,

    generic: function (action, msg, args = []) {
        return (req, res) => Light(req.params.name)
            .then(list => list.map(light =>
                light[action](...args).catch(logErr, light)
            ))
            .then(result => res.status(200).json(result))
    },

    color: (req, res) => {
        const { color, duration } = req.body

        Light(req.params.name)
            .then(list => list.map(light => light
                .changeColor(
                    Color(color, 'rgb'), { duration: duration || 500 }
                ).catch(logErr, light)
            ))
            .then(result => res.status(200).json(result))
    },
}

export default controller