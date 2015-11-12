# npmo-docker

A docker setup for npmo, split into three main components:

- couchdb
- registry
- web

**Note:** Not currently working, very WIP.

## Running

Install the [Docker Toolbox][docker-toolbox].

```
$ FRONT_DOOR_HOST=$(docker-machine ip dev) npm run up
```

[docker-toolbox]: https://www.docker.com/docker-toolbox
