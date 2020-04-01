# WeakIndex

WeakIndex allows you to weakly assign unique ids to tuples of objects.

You should provide a hash function that takes an array of integers to a primitive data type. If you do not provide a hash function, WeakIndex will use the [Cantor tuple function](https://en.wikipedia.org/wiki/Pairing_function), which works well for small numbers of indexes.

```
npm i weakindex
```

## example

```js
const hash = require('object-hash')
const { WeakIndex } = require('weakindex')

const ids = new WeakIndex(hash)
const o1 = {}, o2 = {}, o3 = {}
console.log(ids.put(o1))
console.log(ids.put(o1, o2))
console.log(ids.put(o2, o1))
console.log(ids.put(o1, o2, o3))
```