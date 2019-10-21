#!/bin/bash
docker pull influxdb
docker run --name influx --restart=always -p 8083:8083 -p 8086:8086 -p 25826:25826/udp -e INFLUXDB_DB="test" influxdb

