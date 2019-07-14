import fetch from 'node-fetch'

const DNS_URL = "https://www.duckdns.org/update"
const { DYNAMIC_DNS_DOMAIN, DYNAMIC_DNS_TOKEN } = process.env

async function updateDns() {
    fetch(DNS_URL + `?domains=${DYNAMIC_DNS_DOMAIN}&token=${DYNAMIC_DNS_TOKEN}&ip=`)
        .catch(err => console.log(err))
}

const updatePid = 0;
export default function () {
    clearInterval(updatePid)
    updatePid = setInterval(updateDns, 600000)
}