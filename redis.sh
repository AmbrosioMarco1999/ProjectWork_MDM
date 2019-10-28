#!/bin/bash
docker pull redis
docker run --restart=always -d --name redis --restart=always -p 6379 redis