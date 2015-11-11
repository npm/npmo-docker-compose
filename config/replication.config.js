const dockerHost = process.env.DOCKER_HOST;
const dockerHostname = dockerHost.match(/tcp:\/\/([0-9\.]+):/)[1];

const HOSTS = {
  primary: `${dockerHostname}:55984`,
  secondary: `${dockerHostname}:55985`
};

const INTERNAL_HOSTS = {
  primary: 'couchdbprimary:5984'
};

module.exports = [
  {
    target: HOSTS.secondary,
    upstream: INTERNAL_HOSTS.primary,
    databases: ['example'],
    continuous: true
  }
];
