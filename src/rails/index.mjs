let pattern

const map = new Map()

const PATTERN = '/:alpha/:omega'

const CHAR32 = String.fromCharCode(32)
const CHAR45 = String.fromCharCode(45)

export const any = (o) => !!Reflect.ownKeys(o).length
export const has = (o, k) => Reflect.has(o, k)
export const get = (o, k) => Reflect.get(o, k)

/**
 *  Format simple latin character strings as URL compatible
 *
 *  @param {String} s   The string to convert
 *  @return {String}    The string, converted
 */
export function rail (s) {
  return ( // eslint-disable-next-line no-useless-escape
    s.toLowerCase().replace(/[^\w\-\d]/g, CHAR32).trim().replace(/[\s]+/g, CHAR45).replace(/[\s\s|\-\-]+/g, CHAR45)
  )
}

/**
 *  Interrogate parameters to determine whether or not components can be created
 *
 *  @param {Object} o   The object containing values for the 'pattern'
 *  @param {String} s   The 'pattern' according to which URLs should be created
 *  @param {Boolean} b  Whether the Rails can go
 *  @return {Boolean}
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
export function go (o, s) {
  let b = any(o)

  if (b) {
    let k
    const a = s.match(/(\w+)/g)
    while (b && (k = a.shift())) b = has(o, k) // it is only necessary that the `o` has key `k`. Otherwise, `b = has(o, k) && !!get(o, k)` to enforce a truthy field value for field key `k`
  }

  return b
}

/**
 *  Interrogate parameters for object field names
 *
 *  @param {Object} o   The object containing fields
 *  @param {String} s   The string containing field names to be found
 *  @return {String}
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
export function to (o, s) {
  return (
    s.replace(/(?::)(\w+)/g, (m, k) => m ? has(o, k) ? get(o, k) : m : m)
  )
}

/**
 *  Rails.go()  Boolean
 *  Rails.to()  String
 */
export default class Rails {
  static pattern (p) {
    return (
      p ? (pattern = String(p)) : pattern || (pattern = PATTERN)
    )
  }

  static rail (s) {
    const k = String(s)
    if (map.has(k)) return map.get(k)
    const S = rail(k)
    map.set(k, S)
    return S
  }

  static go (o = {}, s = Rails.pattern()) {
    return ( // eslint-disable-next-line no-cond-assign
      any(o) ? (s = String(s)) ? go(o, s) : false : false // return is s is truthy true then go else false
    )
  }

  static to (o = {}, s = Rails.pattern()) {
    return ( // eslint-disable-next-line no-cond-assign
      any(o) ? (s = String(s)) ? to(o, s) : s : s
    )
  }
}
