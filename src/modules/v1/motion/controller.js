import { Notify } from '@helpers/onesignal'

export const archivePath = '/archive'
export const motionArchive = '/usr/share/hassio/share/motion/'

export default {
    detect: (req, res) => {
        console.log(req.body)
        res.send()
    },
    movie: (req, res) => {
        const { file, action, motion_area } = req.body
        let url = archivePath + '/' + file.replace(motionArchive, '')
        console.log(req.body)
        console.log(url)
        if (action === 'start')
            Notify(`Motion Detected ${motion_area.width}x${motion_area.height}, recording...`)
        else if (action === 'end') {
            Notify('Video Available', url)
        }

        res.send()
    }
}
