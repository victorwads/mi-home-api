const base_domain = location.hostname
let port = location.port == '' ? '' : ':' + location.port
let box

if (['localhost', '127.0.0.1'].indexOf(base_domain) !== -1)
    port = ':' + (port.replace(/[^0-9]/g, '') - 1)

const API_URL = location.protocol + '//api.' + base_domain + port + '/api/v1/'
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
}

window.onload = async () => {
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
        OneSignal.init({
            appId: "d1b284e5-8e85-4b00-bda9-09ae03553fc4",
        });
    });

    box = document.getElementById('box')
}

async function log(requestPromisse) {
    const response = await requestPromisse
    let json = await response.json()
    let text = JSON.stringify(json, null, 2)
    box.innerHTML = text
    return json
}