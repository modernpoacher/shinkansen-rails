const debug = require('debug')

const log = debug('shinkansen:rails')

log('`rails` is awake')

module.exports = require('./lib')
