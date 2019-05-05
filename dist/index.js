'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = require('../package.json'),
    version = _require.version;

// https://github.com/juliangruber/isarray/blob/master/index.js


var isArray = Array.isArray || function (arr) {
  return {}.toString.call(arr) === '[object Array]';
};

// https://github.com/jonschlinkert/isobject/blob/master/index.js
var isObject = function isObject(val) {
  return val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && Array.isArray(val) === false;
};

var isNodeList = function isNodeList(val) {
  return isObject(val) && val.constructor.name === 'NodeList';
};

var isValidCallback = function isValidCallback(cb) {
  return typeof cb === 'function';
};

var isValidKey = function isValidKey(key) {
  return typeof key === 'string' || typeof key === 'number';
};

var isBreakResult = function isBreakResult(result) {
  return typeof result === 'boolean' && result;
};

var call = function call(cb, obj, key) {
  return cb(obj[key], key, obj);
};

function Any(obj) {
  var _this = this;

  this.obj = obj;
  this.version = version;

  this.for = function (cb) {
    if (isValidCallback(cb)) {
      var _obj = _this.obj;
      if (isNodeList(_obj) || isArray(_obj)) {
        var length = _obj.length;
        for (var index = 0; index < length; index++) {
          if (isBreakResult(call(cb, _obj, index))) {
            break;
          }
        }
      } else if (isObject(_obj)) {
        var keys = Object.keys(_obj);
        var _length = keys.length;
        for (var _index = 0; _index < _length; _index++) {
          if (isBreakResult(call(cb, _obj, keys[_index]))) {
            break;
          }
        }
      } else {
        cb(undefined, -1, _obj);
      }
    }
  };

  this.byKey = function ($key, cb) {
    if (isValidCallback(cb) && isValidKey($key)) {
      assemble(_this.obj).for(function (item, key, obj) {
        return cb(item[$key], key, obj, item);
      });
    }
  };
}

var assemble = function assemble(obj) {
  return new Any(obj);
};

module.exports = assemble;
