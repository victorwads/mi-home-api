import { Notify } from '../../../helpers/onesignal'

export const archivePath = '/archive'
export const motionArchive = '/home/homeauto/mi-home-api/services/motion/'

let lastNotify = new Date().getTime()
let recording = false

function NotifyMotion (motionArea) {
  let diff = (new Date().getTime() - lastNotify) / 1000

  if (!recording && diff > 30) {
    Notify(`Motion Detected ${motionArea.width}x${motionArea.height}`)
    lastNotify = new Date().getTime()
  }
}

export default {
  detect: (req, res) => {
    NotifyMotion(req.body.motion_area)
    res.send()
  },
  movie: (req, res) => {
    console.log(req.body)
    const { file, action, motion_area: motionArea } = req.body
    let url = archivePath + '/' + file.replace(motionArchive, '').replace(/\/\//g, '/')
    if (action === 'start') {
      NotifyMotion(motionArea)
      recording = true
    } else if (action === 'end') {
      Notify('Video Available', url)
      recording = false
    }

    res.send()
  }
}
