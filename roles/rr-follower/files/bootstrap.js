var knex = require('knex')
var c = knex({client: 'pg', connection: {driver: 'pg', user: 'postgres', host: 'postgres'}})
c.raw('CREATE DATABASE registry_relational')
.then(function (o) {
  process.exit(0)
})
.catch(function (e) {
  if (e.code === '42P04') process.exit(0)
  else process.exit(1)
})
