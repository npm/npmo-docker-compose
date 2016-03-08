FROM bcoe/newww:2.0.3

RUN apk update
RUN apk add bash
COPY ./files/.env /etc/npme/node_modules/newww/.env
COPY ./files/start.sh /etc/npme/start.sh
