# any-foreach
> Iterate over anything.

## Install
```cmd
// npm
npm init
npm i any-foreach

// or yarn
yarn init
yarn add any-foreach
```


## Import
```js
const AnyFor = require('any-foreach')
// or
import AnyFor from 'any-foreach'
```
## Iterate
### Array
```js
AnyFor([-1, 0, 1, 2]).for((item, key, originObject) => {
  // TODO
  // -1, 0, [-1, 0, 1, 2]
  // 0, 1, [-1, 0, 1, 2]
  // ...
})
```

### Object
```js
AnyFor({ 0: 1, 1: 2, 2: 3 }).for((item, key, originObject) => {
  // TODO
  // 1, 0, { 0: 1, 1: 2, 2: 3 }
  // 2, 1, { 0: 1, 1: 2, 2: 3 }
  // 3, 2, { 0: 1, 1: 2, 2: 3 }
})
```

### NodeList
```js
const elementList = document.querySelectorAll('elements')
AnyFor(elementList).for((item, key, originObject) => {
  // TODO
  // elementItem, elementIndex, elementList
})
```

## Iterate by key
```js
const object = {
  a: {
    k: 1
  },
  b: {
    k: 2
  },
  c: {
    k: 3
  }
}

AnyFor(object).byKey('k', (item, key, originObject, originItem) => {
  // TODO
  // 1 'a' { a: { k: 1 }, b: { k: 2 }, c: { k: 3 } } { k: 1 }
  // 2 'b' { a: { k: 1 }, b: { k: 2 }, c: { k: 3 } } { k: 2 }
  // 3 'c' { a: { k: 1 }, b: { k: 2 }, c: { k: 3 } } { k: 3 }
})
```

## Break
> Return true will break the iterate.
```js
AnyFor([-1, 0, 1, 2]).for((item, key, originObject) => {
  // TODO
  // Break when item is 1
  if(item === 1){
    return true
  }
  // -1, 0, [-1, 0, 1, 2]
  // 0, 1, [-1, 0, 1, 2]
  // 1, 2, [-1, 0, 1, 2]
})
```
