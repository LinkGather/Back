#!/usr/bin/env bash

if [ -d /home/ubuntu/linkgather/Back]; then
  sudo rm -rf /home/ubuntu/linkgather/Back
  echo ">delete folder"
fi
sudo mkdir -vp /home/ubuntu/linkgather/Back
echo ">mkdir"