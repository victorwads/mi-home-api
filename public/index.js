let box;
window.onload = () => {
    box = document.getElementById('box')
}

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
}

async function cleanTest() {
    log(fetch('api/v1/vacuum/zone', {
        ...options,
        body: JSON.stringify({
            repeats: 1,
            zone: "lucas bedroom"
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
    log(fetch('api/v1/vacuum/status', { ...options, method: 'GET' }))
}

async function getZones() {
    log(fetch('api/v1/vacuum/zone', { ...options, method: 'GET' }))
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