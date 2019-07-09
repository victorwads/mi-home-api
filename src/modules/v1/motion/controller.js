import { Notify } from '@helpers/onesignal'

export default {
    detect: (req, res) => {
        console.log(req.body)
        res.send()
    },
    movie: (req, res) => {
        console.log(req.body)
        const { file, action, motion_area } = req.body
        if (action === 'start')
            Notify('Motion Detected')

        res.send()
    }
}
