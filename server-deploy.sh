#!/bin/sh
set -e

echo " Deploying Application... "

echo "Git Pull"
git fetch origin production
git reset --hard origin/production

echo "docker-compose up -d --build"
docker-compose up -d --build

echo " Application Deployed ! "
