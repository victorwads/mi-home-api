
# Home API to Control Home Appliance with Hassio, Motion 

This is a Node Js API that centers some home appliance services initially made to able Voice Control of a Xiaomi Vaccum Cleaner. In my home, I've got new devices and the system starts to growing up. If you want to contribute, be free!!

## API End Points

 - /api/v1/
   - light/ - If name is passed filter light, if not, all lights are used
     - GET:status/:name*?: - Get Lights Status
     - POST:on/:name*?: - Turn on Light
     - POST:off/:name*?: - Turn off Light
     - POST:toggle/:name*?: - Toogle Light Power
     - POST:color/:name*?: - Body: {color: string, duration: int} - Change Light color with duration animation
   - vaccum/
     - GET:status: - Get Vaccum Status
     - GET:zone: - Retrurn the list of zones
     - POST:zone - Body: {[speed: int,] zone: string, repeats: int} - Start Cleaning one or more Zones, zone names splited by ' '
     - POST:speed - Body: {speed: int} - Start Cleaning one or more Zones, zone names splited by ' '
     - POST:stop - Stop the vaccum, even if it is going to dock
     - POST:dock - Send the vaccum to dock
   - motion/
     - POST:detect -{motion_area: {x: int, y: int, width: int, heigth: int}} - Send Motion Detect Notification
     - POST:movie - {file: string, action: string(start|end)[, motion_area: {x: int, y: int, width: int, heigth: int}]}
       When Start: Send Motion Detect Notification
       When Ends: Send Video Access Link Notification
   
# Features

 - Control Xiaomi Vaccum by Google Assitant
   - "Send vaccum to dock"
   - "Change vaccum's Power to ${speed}"
   - "Clean the ${room_name}"
 - Embeded Web Interface
   - Control Xiaomi Vaccum
   - Control Xiaomi Yeelight Ligths
 - Stream WebCam Video via WebInterface
 - Send Web/Mobile Notifications to Device
   - When WebCam Detects Motion - Text With Warning
   - When salves Detected Motion video - Text with button to access the via via WebInterface

[See next planned changes Here](todoing.md)

# Dependencies

 - Miio - Xiaomi Device Comunication - https://github.com/aholstenson/miio
 - Motion - Stream WebCam - https://github.com/Motion-Project/motion
 - OneSignal - Send Notifications - https://github.com/zeyneloz/onesignal-node
 - IFFT - Google Assistant Integration - https://ifttt.com

## Dependencies Configs Examples

 - Motion - [etc/motion/config.d - exemple](docs/examples/etc-motion-config.d)

# Funcional Diagram

![Google Assistant Voice Control Data Flow Diagram](docs/imgs/Google-Assistant-Data-Flow.svg)

# References

References that help me to learn to this project
 - https://github.com/marcelrv/XiaomiRobotVacuumProtocol
 - https://github.com/OpenMiHome/mihome-binary-protocol
 - https://kaeni.de/deutsche-sprachpakete-fuer-den-roborock-sweep-one/
 - https://www.domoticz.com/wiki/Xiaomi_Gateway_(Aqara)
