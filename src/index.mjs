import debug from 'debug'

const log = debug('shinkansen-rails')

log('`shinkansen` is awake')

export { default as Rails } from './rails/index.mjs'
