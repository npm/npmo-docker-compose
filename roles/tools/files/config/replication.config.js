module.exports = [
  {
    target: 'couchdbsecondary:5984',
    upstream: 'couchdbprimary:5984',
    databases: ['example'],
    continuous: true
  }
];
