#!/bin/bash

{ cd /etc/npme/node_modules/newww; node server.js; } &
# { cd /etc/npme/npm-inc/npmo-auth-callbacks; node bin/npmo-auth-callbacks.js start --certificate=$CERTIFICATE --redis=$REDIS_URL; } &
wait -n
kill 0
exit 1
