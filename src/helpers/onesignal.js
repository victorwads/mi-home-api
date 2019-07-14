import OneSignal from 'onesignal-node'

const userAuthKey = process.env.ONE_SIGNAL_USER_KEY
const appAuthKey = process.env.ONE_SIGNAL_APP_KEY
const appId = "d1b284e5-8e85-4b00-bda9-09ae03553fc4"

const NotificationsQuee = []
let queePid = 0
function sendQuee() {
    if (NotificationsQuee.length === 0)
        return
    clearTimeout(queePid)
    for (let i = 0; i < NotificationsQuee.length; i++) {
        Client.sendNotification(NotificationsQuee[i])
            .then(() => {
                NotificationsQuee.slice(i, 1)
            })
            .catch(err => {
                console.log(err.data)
                NotificationsQuee.push(notification)
            })
    }
    queePid = setTimeout(sendQuee, 2000)
}

export const Client = new OneSignal.Client({ userAuthKey, app: { appAuthKey, appId } });
export const Notify = async (msg, url) => {
    NotificationsQuee.push(new OneSignal.Notification({
        contents: {
            en: msg,
        },
        web_buttons: url ? [{ id: "see", text: "Watch", url }] : [],
        included_segments: ["Active Users", "Inactive Users"]
    }))
    sendQuee()
}
export default OneSignal