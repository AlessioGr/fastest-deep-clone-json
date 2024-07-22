import { deepCloneJson } from '../dist/index.js'

const obj = { a: 1, b: { c: 2, d: [1, 2, { test: 'hello' }, 4] } }

const cloned = deepCloneJson(obj)

//Assert the cloned object is not the same as the original object
if (cloned === obj) {
  throw new Error('The cloned object is the same as the original object')
}

//Assert the cloned object is deeply equal to the original object
if (JSON.stringify(cloned) !== JSON.stringify(obj)) {
  throw new Error('The cloned object is not deeply equal to the original object')
}

console.log('Deep clone successful')
