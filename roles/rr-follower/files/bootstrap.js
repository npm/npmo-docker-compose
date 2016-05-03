var knex = require('knex')
var c = knex({client: 'pg', connection: {driver: 'pg', user: 'postgres', host: 'postgres'}})
c.raw('CREATE DATABASE registry_relational')
  .then(function () {
    return c.raw('CREATE DATABASE oauth2_server')
  })
  .then(function () {
    process.exit(0)
  })
  .catch(function (e) {
    if (e.code === '42P04') {
      c.raw('CREATE DATABASE oauth2_server')
        .then(function () {
          process.exit(0)
        })
        .catch(function () {
          if (e.code === '42P04') process.exit(0)
          else process.exit(1)
        })
    } else process.exit(1)
  })
