import fetch from 'node-fetch'

var url = 'http://localhost:8123/api/'
var token = process.env.HASS_TOKEN

async function callService(domain, action, body) {
    console.log(body)
    const response = await fetch(`${url}services/${domain}/${action}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body)
    })
    return await response.text()
}

let alias_zones
{
    let lucasbedroom = [[22900, 23500, 26000, 26000]]
    let susiemess = [[25500, 25500, 25600, 25600]]
    let kitchen = [[21950, 33300, 26500, 35000]]
    let livingroom = [[22000, 29850, 26000, 33100]]
    let hall = [[23200, 26000, 24100, 29950]]
    let bedroom = [
        [23200, 26000, 24200, 26500],
        [22900, 23500, 26000, 26000]
    ]
    alias_zones = {
        lucasbedroom,
        susiemess,
        kitchen,
        livingroom,
        hall,
        bedroom,
        victorbedroom: bedroom
    }
}

function getZone(name) {
    console.log(name)
    name = name.toLowerCase()
        .replace(/(the |my |s )/, '')
        .replace(/[^a-z]*/g, '')
    console.log(name)
    return alias_zones[name]
}

const entities = {
    vaccum_cleanner: "vacuum.xiaomi_vacuum_cleaner"
}

export default {
    alias_zones,
    getZone,
    entities,
    callService
}