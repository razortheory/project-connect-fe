#!/usr/bin/env bash
set -ex

# startup script to be used for debugging

# export environment variables to make them available in ssh session
for var in $(compgen -e); do
    echo "export $var=${!var}" >> /etc/profile
done

echo "Starting SSH ..."
service ssh start

nginx -g daemon off;
