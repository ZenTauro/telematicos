#!/bin/bash

echo "This script is meant to be used from" \
     "the project's toplevel dir"

# Genereate a 4096 bits RSA key
openssl genrsa \
    -out priv/smartroom_priv.pem 4096

# Generate the public key from the private
openssl rsa \
    -in priv/smartroom_priv.pem \
    -pubout -out priv/smartroom_pub.pem
