/* eslint no-useless-escape: 0 */

const map = new Map()

const CHAR32 = String.fromCharCode(32)
const CHAR45 = String.fromCharCode(45)

const engage = (s, b) => (
  s.match(/(\w+)/g).forEach((k, i) => (k in o) ? b ? (b = !!o[k]) : b : b) // sets b to false once and never sets b again
)

const part = (s) => (
  s.toLowerCase().replace(/[^\w\-\d]/g, CHAR32).trim().replace(/[\s]+/g, CHAR45).replace(/[\s\s|\-\-]+/g, CHAR45)
)

let pattern

export class Gears {
  static pattern = (p) => (
    p ? (pattern = p) : pattern
  )

  static engage (s, o) { // console.log('(Gears)okay()', s, o)
    let b = !!s // true if pattern is truthy true
    if (b) engage(s, b) // ?
    return b
  }

  static part = (s) => (
    map.get(s) || (
    map.set(part(s)) || map.get(s))
  )

  static path = (s, o) => (
    s.replace(/(?::)(\w+)/g, (m, k) => m ? (k in o) ? o[k] : m : m)
  )
}
