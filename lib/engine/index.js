'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Engine = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactJsonschemaForm = require('react-jsonschema-form');

var _reactJsonschemaForm2 = _interopRequireDefault(_reactJsonschemaForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Engine = exports.Engine = function (_React$Component) {
  (0, _inherits3.default)(Engine, _React$Component);

  function Engine() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Engine);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Engine.__proto__ || (0, _getPrototypeOf2.default)(Engine)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = function (_ref2) {
      var schema = _ref2.definition.schema;
      return schema !== _this.props.definition.schema;
    }, _this.handleChange = function (parameters) {
      return _this.props.onChange(parameters);
    }, _this.handleSubmit = function (_ref3) {
      var formData = _ref3.formData;
      return _this.props.onSubmit(formData);
    }, _this.handleError = function (parameters) {
      return _this.props.onError(parameters);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Engine, [{
    key: 'render',
    value: function render() {
      // // console.log('(Engine)render()')
      var definition = this.props.definition;


      if ('schema' in definition) {
        var schema = definition.schema,
            formData = definition.formData,
            uiSchema = definition.uiSchema;


        return _react2.default.createElement(
          'div',
          { className: 'react-gears-engine', key: 'react-gears-engine' },
          _react2.default.createElement(_reactJsonschemaForm2.default, {
            schema: schema,
            formData: formData,
            uiSchema: uiSchema,
            onChange: this.handleChange,
            onSubmit: this.handleSubmit,
            onError: this.handleError })
        );
      }

      return false;
    }
  }]);
  return Engine;
}(_react2.default.Component);

Engine.propTypes = {
  definition: _propTypes2.default.shape({
    schema: _propTypes2.default.object
  }).isRequired,
  onChange: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func,
  onError: _propTypes2.default.func
};

Engine.defaultProps = {
  definition: {},
  onChange: function onChange() {}, /* no op */
  onSubmit: function onSubmit() {}, /* no op */
  onError: function onError() {} /* no op */
};