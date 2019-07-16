import { Notify } from '@helpers/onesignal'

export const archivePath = '/archive'
export const motionArchive = '/home/homeauto/mi-home-api/services/motion/'

let last_notify = new Date().getTime()
let recording = false

function NotifyMotion(motion_area) {
    let diff = (new Date().getTime() - last_notify) / 1000

    if (recording == false && diff > 30) {
        Notify(`Motion Detected ${motion_area.width}x${motion_area.height}`)
        last_notify = new Date().getTime()
    }
}

export default {
    detect: (req, res) => {
        NotifyMotion(req.body.motion_area)
        res.send()
    },
    movie: (req, res) => {
        const { file, action, motion_area } = req.body
        let url = archivePath + '/' + file.replace(motionArchive, '')
        if (action === 'start') {
            NotifyMotion(motion_area)
            recording = true
        } else if (action === 'end') {
            Notify('Video Available', url)
            recording = false
        }

        res.send()
    }
}
