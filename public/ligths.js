let boxLight, lastPost, boxRange, boxTemp
{
    boxRange = document.getElementById('ligthRange')
    boxTemp = document.getElementById('temperatureRange')
    selectLight = document.getElementById('lightBox')
    const pickr = Pickr.create({
        el: '.color',
        theme: 'nano',
        default: '#ffff',
        defaultRepresentation: 'HEX',
        components: {
            // Main components
            preview: true,
            opacity: true,
            hue: true,

            interaction: {
                hex: true,
                input: true,
                save: true
            }
        }
    });
    lastPost = new Date().getTime()

    pickr.on('save', (color, instance) => {
        changeColor(color)
    }).on('change', (color, instance) => {
        let diff = new Date().getTime() - lastPost
        if (diff > 100) {
            changeColor(color)
        }
    });

    boxRange.addEventListener('change', function () {
        console.log(this.value)
        changeValue('brightness', this.value);
    })
    boxTemp.addEventListener('change', function () {
        console.log(this.value)
        changeValue('temperature', this.value);
    })
}

async function configStatusLights() {
    let apiCall = getLightStatusAPI()
    log(apiCall)
    const response = await (await apiCall).json()
    let { } = response;
    return apiCall
}

async function getLightStatusAPI() {
    return fetch(API_URL + 'light/status/' + selectLight.value, { ...options, method: 'GET' })
}

async function changeColor(color) {
    lastPost = new Date().getTime()
    log(fetch(API_URL + 'light/color/' + selectLight.value, {
        ...options,
        body: JSON.stringify({ color: '#' + color.toHEXA().join(''), duration: 100 })
    }))
}

async function lightCallGeneric(action) {
    log(fetch(API_URL + 'light/' + action + '/' + selectLight.value, options))
}

async function configStatusLights() {
    const response = await log(getLightStatusAPI())
}

async function changeValue(name, value) {
    lastPost = new Date().getTime()
    log(fetch(API_URL + 'light/' + name + '/' + selectLight.value, {
        ...options,
        body: JSON.stringify({ value })
    }))
}

async function changeColorMode(mode) {
    return changeValue('mode', mode)
}