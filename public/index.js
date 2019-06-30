async function cleanTest() {
    fetch('api/v1/vacuum/zone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            repeats: 1,
            zone: "test"
        })
    })
}

async function cleanStop(){
    fetch('api/v1/vacuum/stop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}