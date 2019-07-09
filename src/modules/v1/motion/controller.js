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
            Notify(`Motion Detected ${motion_area.width}x${motion_area.height}, recording...`)
        else if (action === 'end')
            Notify('Video Available')

        res.send()
    }
}
