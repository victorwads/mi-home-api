let boxCamera;
{
    boxCamera = document.getElementById('video')
}

async function toggleCamera() {
    if (boxCamera.src == '')
        boxCamera.src = 'https://modem.' + base_domain + port
    else
        boxCamera.src = ''
}
