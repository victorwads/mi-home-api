import fetch from 'node-fetch'

const url = 'http://10.0.0.2:8123/api/'
const token = process.env.HASS_TOKEN
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
}

async function callService(domain, action, entity_id, body) {
    const response = await fetch(`${url}services/${domain}/${action}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            entity_id,
            ...body
        })
    })
    return await response.text()
}

async function setStatus(entity_id, body) {
    const response = await fetch(`${url}states/${entity_id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    })
    return await response.json()
}

async function getStatus(entity_id) {
    const response = await fetch(`${url}states/${entity_id}`, {
        method: 'GET',
        headers,
    })
    return await response.json()
}

const entities = {
    vaccum_cleanner: "vacuum.xiaomi_vacuum_cleaner"
}

export default {
    entities,
    getStatus,
    setStatus,
    callService
}