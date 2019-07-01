import fetch from 'node-fetch'

const url = 'http://10.0.0.2:8123/api/'
const token = process.env.HASS_TOKEN
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + token
}

async function callService (domain, action, entityId, body) {
  const response = await fetch(`${url}services/${domain}/${action}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      entity_id: entityId,
      ...body
    })
  })
  return response.json()
}

async function getStatus (entityId) {
  const response = await fetch(`${url}states/${entityId}`, {
    method: 'GET',
    headers
  })
  return response.json()
}

export default {
  getStatus,
  callService
}
