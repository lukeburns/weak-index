const { WeakIndex } = require('./')

const ids = new WeakIndex()
const o1 = {}, o2 = {}, o3 = {}
console.log(ids.put(o1))
console.log(ids.put(o1, o2))
console.log(ids.put(o2, o1))
console.log(ids.put(o1, o2, o3))