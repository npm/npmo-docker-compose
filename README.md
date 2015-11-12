# npmo-docker

A docker setup for npmo, split into three main components:

- couchdb
- registry
- web

**Note:** Not currently working, very WIP.

## Running

Install the [Docker Toolbox][docker-toolbox].

```
$ npm run up
```

To set up couch replication:

```
$ docker-compose run tools replication
```

[docker-toolbox]: https://www.docker.com/docker-toolbox
