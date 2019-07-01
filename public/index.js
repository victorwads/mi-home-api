let box, speedBox, speedState;
window.onload = async () => {
    box = document.getElementById('box')
    zoneBox = document.getElementById('zoneBox')
    speedBox = document.getElementById('speedBox')


    const status = await (await getStatusAPI()).json()
    speedState = status.attributes.fan_speed
    speedBox.value = speedState
    speedBox.addEventListener('change', setSpeed)

    const zones = await (await getZonesAPI()).json()
    for(let zone in zones){
        zoneBox.innerHTML += `<option>${zone}</option>`
    }
}

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
}

async function getStatusAPI() {
    return fetch('api/v1/vacuum/status', { ...options, method: 'GET' })
}

async function getZonesAPI() {
    return fetch('api/v1/vacuum/zone', { ...options, method: 'GET' })
}

async function cleanTest() {
    log(fetch('api/v1/vacuum/zone', {
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
    log(fetch('api/v1/vacuum/speed', {
        ...options,
        body: JSON.stringify({
            speed: speedState,
        })
    }))
}

async function cleanStop() {
    log(fetch('api/v1/vacuum/stop', options))
}

async function goToDock() {
    log(fetch('api/v1/vacuum/dock', options))
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