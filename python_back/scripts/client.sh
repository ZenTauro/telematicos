#!/bin/bash

if [ "${USERNAME}" == "" ]; then
    USERNAME=${2}
fi

if [ "${PASSWORD}" == "" ]; then
    PASSWORD=${3}
fi

if [ "${TOKEN}" == "" ]; then
    TOKEN=${4}
fi

echo "POST > localhost:5000/api/user/${1}"

MESSAGE='{"name": "'${USERNAME}'", "token":"'${TOKEN}'", "pass":"'${PASSWORD}'"}'

curl -s -X POST -H 'Content-Type: application/json' \
    "localhost:5000/api/user/${1}" \
    -d "${MESSAGE}" | jq
