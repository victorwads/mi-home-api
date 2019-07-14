let boxSpeed, speedState, boxBatery, textBatery, textStatus;
{
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

async function configStatus() {
    const response = await log(getStatusAPI())
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
