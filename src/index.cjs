require('@babel/register')({ ignore: [/node_modules/], configFile: require.resolve('../babel.config.cjs') })

const debug = require('debug')

const log = debug('shinkansen-rails')

log('`shinkansen` is awake')

const {
  default: Rails
} = require('./rails/index.mjs')

module.exports.Rails = Rails
