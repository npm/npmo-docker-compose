# npmo-docker

A docker setup for npmo, split into three main components:

- couchdb
- registry
- web

**Note:** Only works locally, very WIP.

## Running

Install the [Docker Toolbox][docker-toolbox], create a machine and run:

```
$ npm run configure
```

This will download your license, and create a docker-compose.yml file. Followed by:

```
$ npm run up
```

This will start the docker instances.

You should now be able to login:

```
$ npm login --registry=http://$(docker-machine ip $DOCKER_MACHINE_NAME):8080 --scope=local
```

[docker-toolbox]: https://www.docker.com/docker-toolbox
