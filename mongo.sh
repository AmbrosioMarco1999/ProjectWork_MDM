#!/bin/bash
docker pull mongo
#docker run --name mongodb --restart=always -d -p 8080:8080 mongo mongod --auth
docker run --name mongodb --restart=always -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME="admin" -e MONGO_INITDB_ROOT_PASSWORD="password" -e MONGO_INITDB_DATABASE="admin" mongo mongod
#sudo docker exec -i -t mongodb bash
#mongo
#use admin
#db.createUser({user:"admin",pwd:"password",roles:[{role:"root",db:"admin"}]});

#exit && exit 

#docker container ls -a
#sudo docker container rm 90986b7feffb
#sudo docker inspect mongodb | grep IPAddress


