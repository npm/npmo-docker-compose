# npmo-docker

A docker setup for npmo, split into three main components:

- couchdb
- registry
- web

**Note:** Only works locally, very WIP.


# Requirements

* Install the [Docker Toolbox][docker-toolbox], create a machine.
* Make sure you have the latest version of the `docker engine` and `docker compose`.
* Optional Node.js/NPM install

# License Setup

## Install with Node.js/NPM

If you have node.js installed in your environment, then you can setup as follows:

```sh
$ npm install
$ npm run configure
```

## Install with Docker

* Direct Internet access

If your host has access to the internet and registry.npmjs.com.

```
$ docker build -t configure -f ./Dockerfile.configure .
```

* Behind the HTTP_PROXY

```
$ docker build --build-arg HTTP_PROXY=$HTTP_PROXY -t licensesetup -f ./Dockerfile.configure .
```

## Run Configuration

```
$ docker run --name license_verify -ti --rm -e HTTP_PROXY=$HTTP_PROXY licensesetup bash
root@050a2795bc15:/usr/src/app#
```

At this point, you are placed at the container terminal where you can run `npm run configure` to setup the license.

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
C /usr
C /usr/src
C /usr/src/app
C /usr/src/app/roles
C /usr/src/app/roles/registry
C /usr/src/app/roles/registry/files
A /usr/src/app/roles/registry/files/.license.json
A /usr/src/app/.env
D /usr/src/app/npm-debug.log

$ docker cp license_verify:/usr/src/app/roles/registry/files/.license.json roles/registry/files/
```

This will copy the license to the appropriate directory. You can now run the services!

```
$ docker-compose up
```

This will start the docker instances.

You should now be able to login:

```
$ npm login --registry=http://$(docker-machine ip $DOCKER_MACHINE_NAME):8080 --scope=local
```

[docker-toolbox]: https://www.docker.com/docker-toolbox
