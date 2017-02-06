/* eslint no-useless-escape: 0 */

const map = new Map()

const CHAR32 = String.fromCharCode(32)
const CHAR45 = String.fromCharCode(45)

/**
 *  Interrogate parameters to determine whether or not components can be created
 *
 *  @param {String} s   The 'pattern' according to which URLs should be created
 *  @param {Object} o   The object containing values for the 'pattern'
 *  @param {Boolean} b  Whether the Gears can engage
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
 *    const engage = (s, o, b) => (
 *      s.match(/(\w+)/g).forEach((k) => (k in o) ? b ? (b = !!o[k]) : b : (b = !!0)) || b
 *    )
 *
 *  Otherwise:
 *
 *    const engage = (s, o, b) => {
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
 *    const engageA = (s, o, b) => {
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
const engage = (s, o, b = true) => {
  const a = s.match(/(\w+)/g)
  let k
  while (b && (k = a.shift())) {
    b = (k in o) ? !!o[k] : !!0
  }
  return b
}

/**
 *  Format simple latin character strings as URL compatible
 *
 *  @param {String} s   The string to convert
 *  @return {String}    The string, converted
 */
const part = (s) => (
  s.toLowerCase().replace(/[^\w\-\d]/g, CHAR32).trim().replace(/[\s]+/g, CHAR45).replace(/[\s\s|\-\-]+/g, CHAR45)
)

/**
 *  While the class itself is not a singleton the 'pattern' variable is scoped to the module
 *
 *  There is no default value for the 'pattern' variable so it must be set in the consuming
 *  application or else ... tings go boom
 */
let pattern

export class Gears {
  static pattern = (p) => (
    p ? (pattern = p) : pattern
  )

  static engage (s, o = {}) {
    let b = !!s // true if pattern is truthy true
    if (b) return engage(s, o)
    return b
  }

  static part = (s) => {
    let S = map.get(s)
    if (S) return S
    map.set(s, S = part(s))
    return S
  }

  static path = (s, o = {}) => (
    s.replace(/(?::)(\w+)/g, (m, k) => ( // can't pull this out into a const because 'o' must be in scope
      m ? (k in o) ? o[k] : m : m
    ))
  )
}
