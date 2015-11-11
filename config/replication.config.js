var HOSTS = {
  primary: '192.168.99.100:55984',
  secondary: '192.168.99.100:55985'
};

var INTERNAL_HOSTS = {
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
