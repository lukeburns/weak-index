class WeakIndexer extends WeakMap {
  constructor () {
    super()
    this.index = 0
  }
  put (key) {
    return this.set(key)
  }
  set (key) {
    const id = this.get(key)
    if (typeof id == 'number') {
      return id
    } else {
      WeakMap.prototype.set.call(this, key, this.index++)
      return this.get(key)
    }
  }
}

class WeakIndex {
  constructor (hash) {
    this.indexes = []
    this.idSet = new Set()
    this.hash = hash || cantorHash
  }
  put (...keys) {
    keys = Array.isArray(keys[0]) ? keys[0] : keys

    if (!this.idSet) {
      this.idSet = new Set()
    }

    const id = this.hash(keys.map((key, i) => {
      if (!this.indexes[i]) {
        this.indexes.push(new WeakIndexer())
      }
      return this.indexes[i].put(key)
    }).concat(keys.length))
    this.idSet.add(id)
    return id
  }
  get (...keys) {
    keys = Array.isArray(keys[0]) ? keys[0] : keys

    var none = false
    const id = keys.map((key, i) => {
      if (!this.indexes[i]) {
        none = true
        return undefined
      }
      const keyId = this.indexes[i].get(key)
      if (typeof keyId !== 'number') {
        none = true
        return undefined
      }
      return keyId
    }).concat(keys.length)
    return none ? undefined : this.hash(id)
  }
  has (...keys) {
    keys = Array.isArray(keys[0]) ? keys[0] : keys
    
    var nan = false
    const id = keys.map((key, i) => {
      if (!this.indexes[i]) {
        nan = true
        return undefined
      }
      return this.indexes[i].get(key)
    }).concat(keys.length)
    return nan ? false : this.idSet.has(this.hash(id))
  }
}

module.exports = {
  WeakIndexer,
  WeakIndex,
  cantor,
  inverse,
}

function cantorHash (ints) {
  const keySize = ints.slice(-1)
  ints = ints.slice(0,-1)
  return `${keySize[0]}|${cantor(...ints)}`
}

function cantor (...ints) {
  ints = Array.isArray(ints[0]) ? ints[0] : ints
  return ints.slice(1).reduce(cantorPair, ints[0])
}

function inverse (z, length=2) {
  z = Array.isArray(z) ? z : [z]
  for (var i = length - 2; i >= 0; i--) {
    z = [...pairInverse(z[0]), ...z.slice(1)]
  }
  return z
}

function cantorPair (x, y) {
  return 1/2 * (x + y) * (x + y + 1) + y
}

function pairInverse (z) {
  const w = Math.floor((Math.sqrt(8 * z + 1) - 1)/2)
  const t = w * (w + 1)/2
  const y = z - t
  const x = w - y
  return [x, y]
}