#!/bin/bash
docker pull redis
docker run --name redis --restart=always -p 6379 redis