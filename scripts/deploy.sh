#!/usr/bin/env bash

cd /home/ubuntu/linkgather/Back/

echo "> deploy"

sudo pm2 kill
sudo pm2 start ecosystem.config.js