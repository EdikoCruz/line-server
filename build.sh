#!/bin/sh

# https://stackoverflow.com/a/6482403/3339789
if [ -z "$(which npm)" ]
then
    echo "install node first"
else
    # to install dependencies
    npm install
    
    # to transpile into js
    npm run build
fi
