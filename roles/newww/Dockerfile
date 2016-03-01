FROM bcoe/newww:1.2.1

RUN apk update
RUN apk add bash
COPY ./files/.env /etc/npme/node_modules/newww/.env
COPY ./files/start.sh /etc/npme/start.sh
