#!/bin/bash

set -e

git checkout .
git pull
docker-compose up -d --build