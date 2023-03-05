#!/bin/bash

docker run -d -p 5000:5000 --name=fin-app-backend fin-app-backend;
docker logs fin-app-backend;