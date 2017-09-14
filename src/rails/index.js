/* eslint no-useless-escape: 0 */

let pattern

const map = new Map()

const PATTERN = '/:alpha/:omega'

const CHAR32 = String.fromCharCode(32)
const CHAR45 = String.fromCharCode(45)

const any = (o) => !!Reflect.ownKeys(o).length
const has = (o, k) => Reflect.has(o, k)
const get = (o, k) => Reflect.get(o, k)

const toString = (s) => (s || `${s}`).toString()

/**
 *  Interrogate parameters to determine whether or not components can be created
 *
 *  @param {String} s   The 'pattern' according to which URLs should be created
 *  @param {Object} o   The object containing values for the 'pattern'
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
 *  Return the boolean (on the other side of the '||'' since 'forEach' returns undefined)
 *
 *  Was:
 *
 *    const go = (s, o, b) => (
 *      s.match(/(\w+)/g).forEach((k) => (k in o) ? b ? (b = !!o[k]) : b : (b = !!0)) || b
 *    )
 *
 *  Otherwise:
 *
 *    const go = (s, o, b) => {
 *      s.match(/(\w+)/g)
 *        .forEach((k) => {
 *          if (Reflect.has(o, k)) {
 *            if (b) {
 *              b = !!Reflect.get(o, k)
 *            }
 *          } else {
 *            b = false
 *          }
 *        })
 *      return b
 *    }
 *
 *  Now (equivalent to):
 *
 *    const go = (s, o, b) => {
 *      const a = s.match(/(\w+)/g)
 *      let k
 *      while (b && (k = a.shift())) {
 *        b = (Reflect.has(o, k)) ? !!Reflect.get(o, k) : false
 *      }
 *      return b
 *    }
 *
 *  (Since 'forEach' does not break, while a 'while' will)
 */
const go = (o, s) => { // babili fails
  let b = any(o)
  if (b) {
    let k
    const a = s.match(/(\w+)/g)
    while (b && (k = a.shift())) {
      b = has(o, k) ? !!get(o, k) : false
    }
  }
  return b // babili fails
}

/**
 *  Format simple latin character strings as URL compatible
 *
 *  @param {String} s   The string to convert
 *  @return {String}    The string, converted
 */
const rail = (s) => (
  s.toLowerCase().replace(/[^\w\-\d]/g, CHAR32).trim().replace(/[\s]+/g, CHAR45).replace(/[\s\s|\-\-]+/g, CHAR45)
)

/**
 *  Rails.go() <- Rails.engage()
 *  Rails.to() <- Rails.path()
 */
export default class Rails {
  static pattern = (p) => (
    p ? (pattern = toString(p)) : pattern || (pattern = PATTERN)
  )

  static rail = (s) => {
    const k = toString(s)
    if (map.has(k)) return map.get(k)
    const S = rail(k)
    map.set(k, S)
    return S
  }

  static go = (o = {}, s = Rails.pattern()) => (
    any(o) ? (s = toString(s)) ? go(o, s) : false : false // return is s is truthy true then go else false
  )

  static to = (o = {}, s = Rails.pattern()) => (
    any(o)
      ? toString(s).replace(/(?::)(\w+)/g, (m, k) => ( // can't pull this out into a const because 'o' must be in scope
        m ? has(o, k) ? get(o, k) : m : m
      ))
      : toString(s)
  )
}
