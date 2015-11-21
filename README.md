# npmo-docker

A docker setup for npmo, split into three main components:

- couchdb
- registry
- web

The idea is that can these can be configured and deployed separately or together.

**Note:** Only works locally, very WIP.

# Requirements

* Install the [Docker Toolbox][docker-toolbox], create a machine.
* Make sure you have the latest version of the `docker` and `docker-compose`.
* Optional Node.js/NPM install

# License Setup

## Install with Docker

* Direct Internet access

If your host has access to the internet and registry.npmjs.com.

```
$ npm run configure
```

TODO: behind a proxy

At this point, you are placed at the container terminal where you can run to setup the license.

```sh
root@050a2795bc15:/usr/src/app# npm run configure
npm info it worked if it ends with ok
npm info using npm@2.14.7
npm info using node@v4.2.2
npm info preconfigure npmo-docker@1.0.0
npm info configure npmo-docker@1.0.0

> npmo-docker@1.0.0 configure /usr/src/app
> ./bin/npme-docker-compose.js configure

? enter your billing email TYPE_YOUR_EMAIL
? enter your license key PASTE_YOUR_LICENSE
? the full front-facing URL of your registry REGISTRY_URL
? proxy URL for outbound requests (optional) HTTP_PROXY
\o/ you can now go ahead and run `npm run up`
npm info postconfigure npmo-docker@1.0.0
npm info ok
```

After you finish, you can detach from the container pressing CTRL+P and CTRL+Q.

## Copy License

You confirm and copy the license.

```sh
$ docker diff license_verify
...

$ docker cp license_verify:/usr/src/app/roles/registry/frontdoor/files/.license.json roles/registry/frontdoor/files/
```

This will copy the license to the appropriate directory. You can now run the services!

```
$ npm run up
```

This will start the docker instances.

You should now be able to login:

```
$ npm login --registry=http://$(docker-machine ip $DOCKER_MACHINE_NAME):8080 --scope=local
```

[docker-toolbox]: https://www.docker.com/docker-toolbox
