let box, speedBox, speedState, bateryBox, bateryText, statusText;
let port = window.location.port == '' ? '' : ':' + window.location.port

const API_URL = 'https://api.home.victorwads.com.br' + port + '/api/v1/'
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
    setInterval(configStatus, 10000);
}

async function toggleCamera() {
    if (video.src == '')
        video.src = 'https://modem.home.victorwads.com.br' + port
    else
        video.src = ''
}

async function configStatus() {
    const response = await (await getStatusAPI()).json()
    const { fan_speed, battery_level, status } = response.attributes;
    speedBox.removeEventListener('change', setSpeed)
    speedState = fan_speed
    speedBox.value = fan_speed

    bateryBox.value = battery_level
    bateryText.innerHTML = battery_level + '%'

    statusText.innerHTML = status + ' - ' + response.state

    speedBox.addEventListener('change', setSpeed)
    return response
}

async function getStatusAPI() {
    return fetch(API_URL + 'vacuum/status', { ...options, method: 'GET' })
}

async function getZonesAPI() {
    return fetch(API_URL + 'vacuum/zone', { ...options, method: 'GET' })
}

async function cleanTest() {
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

async function cleanStop() {
    log(fetch(API_URL + 'vacuum/stop', options))
}

async function goToDock() {
    log(fetch(API_URL + 'vacuum/dock', options))
}

async function getStatus() {
    log(getStatusAPI())
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