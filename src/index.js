const { version } = require('../package.json')

// https://github.com/juliangruber/isarray/blob/master/index.js
const isArray = Array.isArray || function (arr) {
  return {}.toString.call(arr) === '[object Array]'
}

// https://github.com/jonschlinkert/isobject/blob/master/index.js
const isObject = val => {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}

const isNodeList = val => {
  return isObject(val) && val.constructor.name === 'NodeList'
}

const isValidCallback = cb => {
  return typeof cb === 'function'
}

const isValidKey = key => {
  return typeof key === 'string' || typeof key === 'number'
}

const isBreakResult = result => {
  return typeof result === 'boolean' && result
}

const call = (cb, obj, key) => {
  return cb(obj[key], key, obj)
}

function Any (obj) {
  this.obj = obj
  this.version = version

  this.for = cb => {
    if (isValidCallback(cb)) {
      const obj = this.obj
      if (isNodeList(obj) || isArray(obj)) {
        const length = obj.length
        for (let index = 0; index < length; index++) {
          if (isBreakResult(call(cb, obj, index))) {
            break
          }
        }
      } else if (isObject(obj)) {
        const keys = Object.keys(obj)
        const length = keys.length
        for (let index = 0; index < length; index++) {
          if (isBreakResult(call(cb, obj, keys[index]))) {
            break
          }
        }
      } else {
        cb(undefined, -1, obj)
      }
    }
  }

  this.byKey = ($key, cb) => {
    if (isValidCallback(cb) && isValidKey($key)) {
      assemble(this.obj).for((item, key, obj) => {
        return cb(item[$key], key, obj, item)
      })
    }
  }
}

const assemble = obj => {
  return new Any(obj)
}

module.exports = assemble
