#!/bin/bash

# Check Node Install
if [[ ! `npm --help` ]]; then
    echo "Please install node"
    exit
fi

# Restart Motion
if [[ `motion --help` ]]; then
    while sudo killall motion;
    do
        sleep 1
    done
    sudo rm /etc/motion/motion.conf
    sudo cp ./services/motion/motion.conf /etc/motion/motion.conf
    sudo motion
else
    echo "Motion not found"
    echo "Run: sudo apt-get install motion"
    exit
fi

# Install Node Depencencies
if [[ ! -d "./node_modules" ]]; then
    npm i
fi

# Start Server
if [[ ! `pm2 --help` ]]; then
    npm i -g pm2
fi

if [[ `pm2 --help` ]]; then
    echo "Staring Node API"
    pm2 del all
    pm2 start index.js
    pm2 save
    pm2 startup
fi

#Initialize Proxy Manager
cd services/proxy
if [[ ! -f "config.json" ]]; then
    cp config_base.json config.json
fi

docker-compose down
docker-compose up -d

echo "Node API - Shold Listen on 8080"
echo "Node API UI - Shold Listen on 8081"
echo "Motion Web - Shold Listen on 3081"
echo "Motion Stream - Shold Listen on 3081"
echo "Proxy Admin - Should Listen HTTP on 81"
echo "Proxy - Should Listen HTTP on 80"
echo "Proxy - Should Listen HTTPS on 443"