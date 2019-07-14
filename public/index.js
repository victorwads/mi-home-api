const base_domain = window.location.hostname
let box, speedBox, speedState, bateryBox, bateryText, statusText;
let port = window.location.port == '' ? '' : ':' + window.location.port

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

    video = document.getElementById('video')
    box = document.getElementById('box')
    zoneBox = document.getElementById('zoneBox')
    speedBox = document.getElementById('speedBox')
    bateryBox = document.getElementById('bateryBox')
    bateryText = document.getElementById('bateryText')
    statusText = document.getElementById('statusText')

    getZonesAPI()
        .then(res => res.json())
        .then(zones => {
            for (let zone in zones) {
                zoneBox.innerHTML += `<option>${zone}</option>`
            }
        })

    configStatus()
    setInterval(configStatus, 300000);
}

async function toggleCamera() {
    if (video.src == '')
        video.src = 'https://modem.' + base_domain + port
    else
        video.src = ''
}

async function configStatus() {
    let apiCall = getStatusAPI()
    const response = await (await apiCall).json()
    let { fanSpeed, batteryLevel, state } = response;
    speedBox.removeEventListener('change', setSpeed)

    if (fanSpeed > 77)
        fanSpeed = 'Max'
    else if (fanSpeed > 60)
        fanSpeed = 'Turbo'
    else if (fanSpeed > 38)
        fanSpeed = 'Balanced'
    else
        fanSpeed = 'Quiet'

    speedState = fanSpeed
    speedBox.value = fanSpeed

    bateryBox.value = batteryLevel || 0
    bateryText.innerHTML = bateryBox.value + '%'

    statusText.innerHTML = state + ' - ' + response.state

    speedBox.addEventListener('change', setSpeed)
    return apiCall
}

async function getStatusAPI() {
    return fetch(API_URL + 'vacuum/status', { ...options, method: 'GET' })
}

async function getZonesAPI() {
    return fetch(API_URL + 'vacuum/zone', { ...options, method: 'GET' })
}

async function callGeneric(action) {
    log(fetch(API_URL + 'vacuum/' + action, options))
}

async function cleanZone() {
    log(fetch(API_URL + 'vacuum/zone', {
        ...options,
        body: JSON.stringify({
            repeats: 1,
            zone: zoneBox.value
        })
    }))
}

async function setSpeed() {
    if (speedBox.value == speedState)
        return
    speedState = speedBox.value
    log(fetch(API_URL + 'vacuum/speed', {
        ...options,
        body: JSON.stringify({
            speed: speedState,
        })
    }))
}

async function log(requestPromisse) {
    const response = await requestPromisse
    let text = await response.text()
    try {
        let json = JSON.parse(text)
        text = JSON.stringify(json, null, 2)
    } catch{ }
    box.innerHTML = text
}