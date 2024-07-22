/*
Main deepCopyObject handling - from rfdc: https://github.com/davidmarkclements/rfdc/blob/master/index.js

Copyright 2019 "David Mark Clements <david.mark.clements@gmail.com>"

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
*/

function copyBuffer(cur) {
  if (cur instanceof Buffer) {
    return Buffer.from(cur)
  }

  return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length)
}

const constructorHandlers = new Map()
constructorHandlers.set(Date, (o) => new Date(o))
constructorHandlers.set(Map, (o, fn) => new Map(cloneArray < any > (Array.from(o), fn)))
constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)))
let handler = null

function cloneArray(a, fn) {
  const keys = Object.keys(a)
  const a2 = new Array(keys.length)
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]
    const cur = a[k]
    if (typeof cur !== 'object' || cur === null) {
      a2[k] = cur
    } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
      a2[k] = handler(cur, fn)
    } else if (ArrayBuffer.isView(cur)) {
      a2[k] = copyBuffer(cur)
    } else {
      a2[k] = fn(cur)
    }
  }
  return a2
}

export const rfdc = (o) => {
  if (typeof o !== 'object' || o === null) return o
  if (Array.isArray(o)) return cloneArray(o, deepCopyObject)
  if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
    return handler(o, deepCopyObject)
  }
  const o2 = {}
  for (const k in o) {
    if (Object.hasOwnProperty.call(o, k) === false) continue
    const cur = o[k]
    if (typeof cur !== 'object' || cur === null) {
      o2[k] = cur
    } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
      o2[k] = handler(cur, deepCopyObject)
    } else if (ArrayBuffer.isView(cur)) {
      o2[k] = copyBuffer(cur)
    } else {
      o2[k] = deepCopyObject(cur)
    }
  }
  return o2
}

export let deepCopyObject = (inObject) => {
  if (inObject instanceof Date) return inObject

  if (inObject instanceof Set) return new Set(inObject)

  if (inObject instanceof Map) return new Map(inObject)

  if (typeof inObject !== 'object' || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  const outObject = Array.isArray(inObject) ? [] : {}

  Object.keys(inObject).forEach((key) => {
    const value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = typeof value === 'object' && value !== null ? deepCopyObject(value) : value
  })

  return outObject
}

export function deepCopyObjectSimple(inObject) {
  if (typeof inObject !== 'object' || inObject === null) {
    return inObject
  }

  const outObject = Array.isArray(inObject) ? [] : {}

  for (const key in inObject) {
    const value = inObject[key]
    outObject[key] =
      typeof value === 'object' && value !== null ? deepCopyObjectSimple(value) : value
  }

  return outObject
}

let isArray = Array.isArray

export function copy(obj) {
  if (!obj) return obj
  if (isArray(obj)) {
    let arr = []
    let length = obj.length
    for (let i = 0; i < length; i++) arr.push(copy(obj[i]))
    return arr
  } else if (typeof obj === 'object') {
    let keys = Object.keys(obj)
    let length = keys.length
    let newObject = {}
    for (let i = 0; i < length; i++) {
      let key = keys[i]
      newObject[key] = copy(obj[key])
    }
    return newObject
  }
  return obj
}

let objectKeys = Object.keys

export function copyv2(val) {
  if (!val) return val
  if (isArray(val)) {
    let arr = []
    let length = val.length
    for (let i = 0; i < length; i++) arr.push(copy(val[i]))
    return arr
  } else if (typeof val === 'object') {
    let keys = objectKeys(val)
    let newObject = {}
    for (let i = keys.length - 1; i > -1; i--) {
      let key = keys[i]
      newObject[key] = copy(val[key])
    }
    return newObject
  }
  return val
}

function cloneRegExp(re) {
  const regexMatch = /^\/(.*)\/([gimyu]*)$/.exec(re.toString())
  return new RegExp(regexMatch[1], regexMatch[2])
}

// https://github.com/rhysd/fast-json-clone/blob/main/index.ts
export function clone3(value) {
  if (typeof value !== 'object' || value === null) {
    return value
  } else if (Array.isArray(value)) {
    return value.map((e) => (typeof e !== 'object' || e === null ? e : clone3(e)))
  } else {
    const ret = {}
    for (const k in value) {
      const v = value[k]
      ret[k] = typeof v !== 'object' || v === null ? v : clone3(v)
    }
    return ret
  }
}
export function clone(arg) {
  if (typeof arg !== 'object') {
    return arg
  }
  if (arg === null) {
    return null
  }
  if (Array.isArray(arg)) {
    return arg.map(clone)
  }
  const cloned = {}
  for (const name in arg) {
    if (Object.prototype.hasOwnProperty.call(arg, name)) {
      cloned[name] = clone(arg[name])
    }
  }
  return cloned
}

export let MyObject = {
  description: 'Creates a deep copy of source, which should be an object or an array.',
  myNumber: 123456789,
  myBoolean: true,
  jayson: {
    stringify: 'JSON.stringify() method converts a JavaScript value to a JSON string....',
    parse: 'JSON.parse() method parses a JSON string...',
    array: [1, { str: 'str' }, 3, 4],
  },
}

function generateNestedObject(depth, breadth) {
  if (depth === 0) {
    return 'end' // Base value at the deepest level
  }

  let result = {}
  for (let i = 0; i < breadth; i++) {
    result[`key${i}`] = {
      value: `value${depth}-${i}`,
      nestedArray: Array.from({ length: breadth }, (_, k) => `item${depth}-${i}-${k}`),
      nestedObject: generateNestedObject(depth - 1, breadth),
    }
  }
  return result
}

export let MyHugeObject = generateNestedObject(7, 4)
