'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gears = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _get = require('babel-runtime/core-js/reflect/get');

var _get2 = _interopRequireDefault(_get);

var _has = require('babel-runtime/core-js/reflect/has');

var _has2 = _interopRequireDefault(_has);

var _ownKeys = require('babel-runtime/core-js/reflect/own-keys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-useless-escape: 0 */

var pattern = void 0;

var map = new _map2.default();

var PATTERN = '/:alpha/:omega';

var CHAR32 = String.fromCharCode(32);
var CHAR45 = String.fromCharCode(45);

var any = function any(o) {
  return !!(0, _ownKeys2.default)(o).length;
};
var has = function has(o, k) {
  return (0, _has2.default)(o, k);
};
var get = function get(o, k) {
  return (0, _get2.default)(o, k);
};

var toString = function toString(s) {
  return (s || '' + s).toString

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
   *    const engage = (s, o, b) => {
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
  ();
};var engage = function engage(s, o) {
  var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var a = s.match(/(\w+)/g);
  var k = void 0;
  while (b && (k = a.shift())) {
    b = has(o, k) ? !!get(o, k) : !!0;
  }
  return b;
};

/**
 *  Format simple latin character strings as URL compatible
 *
 *  @param {String} s   The string to convert
 *  @return {String}    The string, converted
 */
var part = function part(s) {
  return s.toLowerCase().replace(/[^\w\-\d]/g, CHAR32).trim().replace(/[\s]+/g, CHAR45).replace(/[\s\s|\-\-]+/g, CHAR45);
};

var Gears = exports.Gears = function Gears() {
  (0, _classCallCheck3.default)(this, Gears);
};

Gears.pattern = function (p) {
  return !!p ? pattern = toString(p) : pattern || (pattern = PATTERN);
};

Gears.engage = function () {
  var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Gears.pattern();
  return any(o) ? (s = toString(s)) ? engage(s, o) : !!0 : !!0 // return is s is truthy true then engage else false
  ;
};

Gears.part = function (s) {
  var k = toString(s);
  if (map.has(k)) return map.get(k);
  var S = part(k);
  map.set(k, S);
  return S;
};

Gears.path = function () {
  var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Gears.pattern();
  return any(o) ? toString(s).replace(/(?::)(\w+)/g, function (m, k) {
    return (// can't pull this out into a const because 'o' must be in scope
      m ? has(o, k) ? get(o, k) : m : m
    );
  }) : toString(s);
};