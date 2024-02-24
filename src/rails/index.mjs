import debug from 'debug'

const log = debug('shinkansen-rails')

log('`shinkansen` is awake')

let pattern

const map = new Map()

const PATTERN = '/:alpha/:omega'

const CHAR32 = String.fromCharCode(32)
const CHAR45 = String.fromCharCode(45)

/**
 *  @param {Record<string, unknown>} o   The object containing values
 */
export const any = (o) => !!Reflect.ownKeys(o).length

/**
 *  @param {Record<string, unknown>} o   The object containing values
 *  @param {string} k   The value name
 */
export const has = (o, k) => Reflect.has(o, k)

/**
 *  @param {Record<string, unknown>} o   The object containing values
 *  @param {string} k   The value name
 */
export const get = (o, k) => Reflect.get(o, k)

/**
 *  Format simple latin character strings as URL compatible
 *
 *  @param {string} p   The string to convert
 *  @return {string}    The string, converted
 */
export function rail (p) {
  return ( // eslint-disable-next-line no-useless-escape
    p.toLowerCase().replace(/[^\w\-\d]/g, CHAR32).trim().replace(/[\s]+/g, CHAR45).replace(/[\s\s|\-\-]+/g, CHAR45)
  )
}

/**
 *  Interrogate parameters to determine whether or not components can be created
 *
 *  @param {Record<string, unknown>} o   The object containing values for the 'pattern'
 *  @param {string} p   The 'pattern' according to which URLs should be created
 *  @param {boolean} b  Whether the Rails can go
 *  @return {boolean}
 *
 *  @description
 *
 *  Split the pattern into useful strings (such that '/:alpha/:omega' becomes ['alpha', 'omega']
 *    For each string in the array
 *      If the string exists as a key in the object
 *        If the boolean is true
 *          set the boolean = whether the object has a property for that key
 *            return that boolean (to the loop. It doesn't exit here)
 *      Else set the boolean as false and return it (to the loop. It doesn't exit here, either)
 *  Return the boolean
 *
 *  A `reduce` cannot break when `b` is false
 */
export function go (o, p) {
  let b = any(o)

  if (b) {
    let k
    const a = p.match(/(\w+)/g)
    while (b && (k = a.shift())) b = has(o, k) // it is only necessary that the `o` has key `k`. Otherwise, `b = has(o, k) && !!get(o, k)` to enforce a truthy field value for field key `k`
  }

  return b
}

/**
 *  Interrogate parameters for object field names
 *
 *  @param {Record<string, unknown>} o   The object containing fields
 *  @param {string} p   The string containing field names to be found
 *  @return {string}
 *
 *  @description
 *
 *  A valid object is
 *
 *    { fieldName: 'field Value' }
 *
 *  A valid string is
 *
 *    /:fieldName
 */
export function to (o, p) {
  return (
    p.replace(/(?::)(\w+)/g, (m, k) => m ? has(o, k) ? get(o, k) : m : m)
  )
}

export default class Rails {
  /**
   *  @param {string | undefined} p   The 'pattern' according to which URLs should be created
   *  @return {string}
   */
  static pattern (p) {
    return (
      p ? (pattern = String(p)) : pattern || (pattern = PATTERN)
    )
  }

  /**
   *  @param {string | undefined} p   The 'pattern' according to which URLs should be created
   *  @return {string}
   */
  static rail (p = Rails.pattern()) {
    const k = String(p)
    if (map.has(k)) return map.get(k)
    const s = rail(k)
    map.set(k, s)
    return s
  }

  /**
   *  @param {Record<string, unknown> | undefined} o   The object containing values for the 'pattern'
   *  @param {string | undefined} p   The 'pattern' according to which URLs should be created
   *  @return {boolean}
   */
  static go (o = {}, p = Rails.pattern()) {
    return ( // eslint-disable-next-line no-cond-assign
      any(o) ? (p = String(p)) ? go(o, p) : false : false // return is p is truthy true then go else false
    )
  }

  /**
   *  @param {Record<string, unknown> | undefined} o   The object containing values for the 'pattern'
   *  @param {string | undefined} p   The 'pattern' according to which URLs should be created
   *  @return {boolean}
   */
  static to (o = {}, p = Rails.pattern()) {
    return ( // eslint-disable-next-line no-cond-assign
      any(o) ? (p = String(p)) ? to(o, p) : p : p
    )
  }
}
