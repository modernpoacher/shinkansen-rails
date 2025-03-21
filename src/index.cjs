require('@babel/register')({
  ignore: [
    /node_modules\/(?!shinkansen|@modernpoacher)/
  ]
})

const debug = require('debug')

const log = debug('shinkansen-rails')

log('`shinkansen` is awake')

const {
  default: Rails // @ts-expect-error
} = require('./rails/index.mjs')

module.exports.Rails = Rails
