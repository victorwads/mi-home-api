import OneSignal from 'onesignal-node'

const userAuthKey = process.env.ONE_SIGNAL_USER_KEY
const appAuthKey = process.env.ONE_SIGNAL_APP_KEY
const appId = "d1b284e5-8e85-4b00-bda9-09ae03553fc4"

console.log('userAuthKey', userAuthKey)
console.log('appAuthKey', appAuthKey)
console.log('appId', appId)

export const Client = new OneSignal.Client({ userAuthKey, app: { appAuthKey, appId } });
export const Notify = async msg => {
    let notification = new OneSignal.Notification({
        contents: {
            en: msg,
        },
        //web_buttons: [{ "id": "see", "text": "See More", "icon": "http://i.imgur.com/MIxJp1L.png", "url": "" }],
        included_segments: ["Active Users", "Inactive Users"]
    });
    Client.sendNotification(notification)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.data))
}
export default OneSignal