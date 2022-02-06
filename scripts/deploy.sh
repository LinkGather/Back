#!/usr/bin/env bash

REPOSITORY = /home/ubuntu/linkgather/Back/
cd $REPOSITORY

sudo pm2 start ecosystem.config.js