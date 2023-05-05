require('@babel/register')({ ignore: [] })

const debug = require('debug')

const log = debug('shinkansen-rails')

log('`shinkansen` is awake')

const {
  default: Rails
} = require('./rails/index.mjs')

module.exports.Rails = Rails
