#!/bin/sh


# https://stackoverflow.com/a/6482403/3339789
if [ -z "$1" ]
then
    echo "No argument supplied"
else
    # configuration by env with default values
    # export FILE_SERVER_FOLDER_PATH=files
    # export FILE_SERVER_EXTENSION=txt
    export FILE_SERVER_NAME=$1

    # running the builded version (JS)
    npm run start
fi
