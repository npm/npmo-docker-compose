# npmo-docker

A docker setup for npmo, split into three main components:

- couchdb
- registry
- web

**Note:** Only works locally, very WIP.

## Running

Install the [Docker Toolbox][docker-toolbox], create a machine and run:

```
$ FRONT_DOOR_HOST=$(docker-machine ip $DOCKER_MACHINE_NAME) npm run up
```

Then you should be able to login:

```
$ npm login --registry=http://$(docker-machine ip $DOCKER_MACHINE_NAME):8080 --scope=local
```

[docker-toolbox]: https://www.docker.com/docker-toolbox
