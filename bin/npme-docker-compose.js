#!/usr/bin/env node

var fs = require('fs')
var path = require('path')

var rootPath = path.resolve(__dirname, '..')
var addRoot = path.resolve.bind(path, rootPath)

var pkg = require(addRoot('package.json'))
var argv = require('yargs')
  .usage('$0 <command> [arguments]')
  .option('registry-env-file', {
    default: addRoot('templates/registry.env.mustache'),
    description: 'where is the environment template file for the registry role?'
  })
  .option('components', {
    default: 'couchdb,registry,web',
    description: 'which components are you configuring?'
  })
  .help('help')
  .alias('h', 'help')
  .version(pkg.version, 'version')
  .alias('v', 'version')
  .command('configure', 'configure your npm On-Site environment')
  .demand(1)
  .argv
var chalk = require('chalk')
var inquirer = require('inquirer')
var License = require('../lib/license')
var license = new License()
var Mustache = require('mustache')

var configTargets = [
  {
    input: addRoot(argv.registryEnvFile),
    output: addRoot('roles/registry/registry.env')
  }
]

if (~argv._.indexOf('license')) {
  license.interview(function () {
    fs.writeFileSync(
      addRoot('roles/registry/frontdoor/files/.license.json'),
      JSON.stringify(license.license, null, 2),
      'utf-8'
    )
  })
}

if (~argv._.indexOf('configure')) {
  console.log(chalk.green('configuring:'), argv.components, '\n')
  var components = argv.components.split(',')
    .reduce(function(s,k){return s[k]=true,s}, {})
  var prompts = [];

  if (components.couchdb) {}
  if (components.registry) {
    prompts = prompts.concat([
      {
        type: 'input',
        name: 'couch-base',
        message: 'Where can I find CouchDB?',
        default: 'http://admin:admin@127.0.0.1:5984'
      },
      {
        type: 'input',
        name: 'front-door-base',
        message: 'What URL will be used to access the registry?',
        default: 'http://127.0.0.1:8080'
      },
      {
        type: 'input',
        name: 'proxy',
        message: 'Optionally, what URL should I use as an HTTP proxy?'
      }
    ])
  }
  if (components.web) {}

  inquirer.prompt(prompts, function (answers) {
    configTargets.forEach(function (target) {
      console.log('creating %s from %s', target.output, target.input)
      var inputEnv = fs.readFileSync(target.input, 'utf-8')
      var env = Mustache.render(inputEnv, answers)
      fs.writeFileSync(target.output, env, 'utf-8')
    })
    console.log(chalk.green('\n\\o/ you can now go ahead and run `npm run up`'))
  })
}
