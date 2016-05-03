FROM bcoe/newww:3.2.0

RUN apk update
RUN apk add bash
COPY ./files/.env /etc/npme/node_modules/@npm/website/.env
COPY ./files/start.sh /etc/npme/start.sh
COPY ./files/start.sh /etc/npme/start.sh
WORKDIR /etc/npme
COPY ./files/config.json /etc/npme/node_modules/oauth2-server-pg/config.json
