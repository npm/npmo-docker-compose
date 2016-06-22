#!/usr/bin/env sh
chmod 755 /etc/npme/install-couch-app.sh

curl --fail -XGET $COUCH_URL
ret=$?
if [ $ret -ne 0 ]; then
  sh /etc/npme/install-couch-app.sh
fi

curl --fail -XGET $COUCH_URL
ret=$?
if [ $ret -ne 0 ]; then
  exit 1
fi

if [ $AUTH_GLOBAL_PACKAGES == 'false' ]; then
  unset AUTH_GLOBAL_PACKAGES
fi

cd /etc/npme/node_modules/@npm/registry-frontdoor/
if [ -n "$PROXY_URL" ]; then
  node ./bin/registry-frontdoor.js start --license=$LICENSE --binary-directory=$BINARY_DIRECTORY --binaries-host=$BINARIES_HOST --proxy=$PROXY_URL --auth-host=$AUTH_HOST --reject-unauthorized=$REJECT_UNAUTHORIZED --shared-fetch-secret=$SHARED_FETCH_SECRET --couch-url=$COUCH_URL --validate-host=$VALIDATE_HOST --front-door-host=$FRONT_DOOR_HOST --read-through-cache=$READ_THROUGH_CACHE --auth-fetch=$AUTH_FETCH --port=8080 --host=0.0.0.0 --white-list-path=$WHITELIST_PATH --couch-url-cache=$COUCH_URL_REMOTE
else
  node ./bin/registry-frontdoor.js start --license=$LICENSE --binary-directory=$BINARY_DIRECTORY --binaries-host=$BINARIES_HOST --auth-host=$AUTH_HOST --reject-unauthorized=$REJECT_UNAUTHORIZED --shared-fetch-secret=$SHARED_FETCH_SECRET --couch-url=$COUCH_URL --validate-host=$VALIDATE_HOST --front-door-host=$FRONT_DOOR_HOST --read-through-cache=$READ_THROUGH_CACHE --auth-fetch=$AUTH_FETCH --port=8080 --host=0.0.0.0 --white-list-path=$WHITELIST_PATH --couch-url-cache=$COUCH_URL_REMOTE
fi
