import { deepCloneJson } from '../dist/index.js'
import {
  copy,
  deepCopyObjectSimple,
  clone,
  copyv2,
  deepCopyObject,
  clone3,
  clone3WithDates,
  rfdc,
  clone3WithDatesStrings,
} from './benchmarkSetup.js'
const obj = { a: 1 /*, date: new Date()*/, b: { c: 2, d: [1, 2, { test: 'hello' }, 4] } }

const cloned = deepCloneJson(obj)

//Assert the cloned object is not the same as the original object
if (cloned === obj) {
  console.warn('deepCloneJson: The cloned object is the same as the original object')
}

//Assert the cloned object is deeply equal to the original object
if (JSON.stringify(cloned) !== JSON.stringify(obj)) {
  console.warn('deepCloneJson: The cloned object is not deeply equal to the original object')
}

console.log('Deep clone successful')

// Now test all the other functions

const testFunctions = [
  { name: 'deepCopyObjectSimple', func: deepCopyObjectSimple },
  { name: 'clone', func: clone },
  { name: 'deepCopyObject', func: deepCopyObject },
  { name: 'deepCopyObjectIterative', func: deepCloneJson },
  { name: 'copy', func: copy },
  { name: 'copyv2', func: copyv2 },
  { name: 'clone3', func: clone3 },
  { name: 'clone3WithDates', func: clone3WithDates },
  { name: 'rfdc', func: rfdc },
  { name: 'clone3WithDatesStrings', func: clone3WithDatesStrings },
]

// Collect all results
const results = testFunctions.map((f) => ({
  name: f.name,
  result: f.func(obj),
}))

// Assert the results are deeply equal to the original object
results.forEach((result) => {
  /*if (result.name === 'clone3') {
    console.log('clone3', result.result)
  }
  if (result.name === 'clone3WithDates') {
    console.log('clone3WithDates', result.result)
  }*/
  if (JSON.stringify(result.result) !== JSON.stringify(obj)) {
    console.warn(
      `The result of ${result.name} is not deeply equal to the original object. Result:`,
      JSON.stringify(result.result, null, 2),
      'Original object:',
      JSON.stringify(obj, null, 2),
    )
  }
})

//Assert the cloned object is not the same as the original object
results.forEach((result) => {
  if (result.result === obj) {
    throw new Error(`The result of ${result.name} is the same as the original object`)
  }
})

console.log('All functions passed the test')
