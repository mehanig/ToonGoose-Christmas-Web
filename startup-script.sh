#!/usr/bin/env bash

set -v

if [ ! -f /var/database/db.sqlite3 ]; then
    mkdir -p /var/database/ && touch /var/database/db.sqlite3
fi

apt install docker.io -y
service docker start
gcloud docker pull gcr.io/toongoseny/toongosenyimage
# Expose 80 port to outside and mount data volume with sqlite to container, so it stays persistent when container dies (Not VM)
docker run -d -p 80:80 -v /var/database:/app/database gcr.io/toongoseny/toongosenyimage