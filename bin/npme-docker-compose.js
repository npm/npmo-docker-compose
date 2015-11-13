#!/usr/bin/env node

var fs = require('fs')
var argv = require('yargs')
  .usage('$0 <command> [arguments]')
  .option('c', {
    alias: 'docker-compose-template',
    default: './.env.mustache',
    description: 'where is the docker-compose.yml template file?'
  })
  .option('o', {
    alias: 'docker-compose-output',
    default: './.env',
    description: 'where should the final docker-compose.yml be outputted?'
  })
  .help('help')
  .alias('h', 'help')
  .version(require('../package.json').version, 'version')
  .alias('v', 'version')
  .command('configure', 'configure your npm On-Site environment')
  .demand(1)
  .argv
var chalk = require('chalk')
var inquirer = require('inquirer')
var License = require('../lib/license')
var license = new License()
var Mustache = require('mustache')

if (~argv._.indexOf('configure')) {
  license.interview(function () {
    fs.writeFileSync('./roles/registry/files/.license.json', JSON.stringify(license.license, null, 2), 'utf-8')

    inquirer.prompt([
      {
        type: 'input',
        name: 'front-door-host',
        message: 'the full front-facing URL of your registry',
        default: 'http://127.0.0.1:8080'
      },
      {
        type: 'input',
        name: 'proxy',
        message: 'proxy URL for outbound requests (optional)'
      }
    ], function (answers) {
      var output = Mustache.render(fs.readFileSync(argv.dockerComposeTemplate, 'utf-8'), answers)
      fs.writeFileSync(argv.dockerComposeOutput, output, 'utf-8')
      console.log(chalk.green('\\o/ you can now go ahead and run `npm run up`'))
    })
  })
}
