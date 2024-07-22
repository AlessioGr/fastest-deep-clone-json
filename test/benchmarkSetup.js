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
