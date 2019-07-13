
# Home API to Control Home Appliance with Hassio, Motion 

This is a Node Js API that centers some home appliance services initially made to able Voice Control of a Xiaomi Vaccum Cleaner. In my home, I've got new devices and the system starts to growing up. If you want to contribute, be free!!

## API End Points

 - /api/v1/
   - vaccum/
     - status:GET - Get Vaccum Status
     - zone:GET - Retrurn the list of zones
     - zone:POST - Body: {[speed: int,] zone: string, repeats: int} - Start Cleaning one or more Zones, zone names splited by ' '
     - speed:POST - Body: {speed: int} - Start Cleaning one or more Zones, zone names splited by ' '
     - stop:POST - Stop the vaccum, even if it is going to dock
     - dock:POST - Send the vaccum to dock
   - motion/
     - detect:POST -{motion_area: {x: int, y: int, width: int, heigth: int}}
       Send Motion Detect Notification - TO DO
     - movie:POST - {file: string, action: string(start|end)[, motion_area: {x: int, y: int, width: int, heigth: int}]}
       When Start: Send Motion Detect Notification
       When Stops: Send Video Access Link Notification
   
# Features

 - Control Xiaomi Vaccum by Google Assitant
   - "Send vaccum to dock"
   - "Change vaccum's Power to ${speed}"
   - "Clean the ${room_name}"
 - Control Xiaomi Vaccum by Embeded Web Interface
 - Stream WebCam Video via WebInterface
 - Send Web/Mobile Notifications to Device
   - When WebCam Detects Motion - Text With Warning
   - When salves Detected Motion video - Text with button to access the via via WebInterface

[See next planned changes Here](todoing.md)

# Dependencies

 - Miio - Xiaomi Device Comunication - https://github.com/aholstenson/miio
 - Motion - Stream WebCam - https://github.com/Motion-Project/motion
 - OneSignal - Send Notifications - https://github.com/zeyneloz/onesignal-node
 - Hassio - Home Automation System Using Docker - https://www.home-assistant.io/hassio/
  - core - will be replaced by miio npm package
 - IFFT - Google Assistant Integration - https://ifttt.com

## Dependencies Configs Examples

 - Motion - [etc/motion/config.d - exemple](docs/examples/etc-motion-config.d)
 - Hassio - [config/configuration.yaml](docs/examples/hassio-config-configuration.yaml)

# Funcional Diagram

![Google Assistant Voice Control Data Flow Diagram](docs/imgs/Google-Assistant-Data-Flow.svg)

# References

References that help me to learn to this project
 - https://github.com/marcelrv/XiaomiRobotVacuumProtocol
 - https://github.com/OpenMiHome/mihome-binary-protocol
 - https://kaeni.de/deutsche-sprachpakete-fuer-den-roborock-sweep-one/
 - https://www.domoticz.com/wiki/Xiaomi_Gateway_(Aqara)
