import fetch from 'node-fetch'

const DNS_URL = "https://www.duckdns.org/update"
const { DYNAMIC_DNS_DOMAIN, DYNAMIC_DNS_TOKEN } = process.env

function updateDns() {
    fetch(DNS_URL + `?domains=${DYNAMIC_DNS_DOMAIN}&token=${DYNAMIC_DNS_TOKEN}&ip=`)
        .then(async res => console.log('DNS Update', await res.text()))
        .catch(err => console.log(err.data))
}

let updatePid = 0;
export default function () {
    clearInterval(updatePid)
    updatePid = setInterval(updateDns, 600000)
}