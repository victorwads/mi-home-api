const base_domain = window.location.hostname
let port = window.location.port == '' ? '' : ':' + window.location.port
let box

const API_URL = 'https://api.' + base_domain + port + '/api/v1/'
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