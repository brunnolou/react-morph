"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getValueFromProgress = function getValueFromProgress(from, to, progress) {
  return -progress * from + progress * to + from;
};

var interpolateObject = exports.interpolateObject = function interpolateObject() {
  var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (t) {
    return Object.assign({}, Object.keys(from).reduce(function (acc, key) {
      return Object.assign(_defineProperty({}, key, getValueFromProgress(from[key], to[key], t)), acc);
    }, {}));
  };
};

exports.default = {
  interpolateObject: interpolateObject
};
//# sourceMappingURL=util.js.map