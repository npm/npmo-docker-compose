#!/bin/bash
cd /etc/npme/node_modules/npm-registry-couchapp

echo "CONFIG:"
echo $COUCH_BASE
echo $COUCH_URL

# wait for CouchDB to be online before we put the documents.
# note that username and password on CouchDB are both admin.
until $(curl --output /dev/null --silent --head --fail ${COUCH_BASE}/); do
    printf '.'
    sleep 2
done

curl -XPUT ${COUCH_URL}
DEPLOY_VERSION=testing npm start --npm-registry-couchapp:couch=${COUCH_URL}
npm run load --npm-registry-couchapp:couch=${COUCH_URL}
NO_PROMPT=true npm run copy --npm-registry-couchapp:couch=${COUCH_URL}
