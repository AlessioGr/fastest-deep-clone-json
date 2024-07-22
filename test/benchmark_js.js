import Benchmark from 'benchmark'
import {
  copy,
  deepCopyObjectSimple,
  clone,
  MyObject,
  copyv2,
  deepCopyObject,
  MyHugeObject,
} from './benchmarkSetup.js'
import { deepCloneJson } from '../dist/index.js'

// Function to setup benchmarks for a given object
function setupBenchmarks(suiteName, objectToCopy) {
  const suite = new Benchmark.Suite(suiteName)

  // Helper function to add benchmarks to the suite
  suite
    .add('JSON.stringify/parse', () => JSON.parse(JSON.stringify(objectToCopy)))
    .add('structuredClone', () => structuredClone(objectToCopy))
    .add('deepCopyObject', () => deepCopyObject(objectToCopy))
    .add('deepCopyObjectSimple', () => deepCopyObjectSimple(objectToCopy))
    .add('deepCopyObjectIterative', () => deepCloneJson(objectToCopy))
    .add('copy', () => copy(objectToCopy))
    .add('clone', () => clone(objectToCopy))
    .add('copyv2', () => copyv2(objectToCopy))
    .on('cycle', function (event) {
      console.log(String(event.target))
    })
    .on('complete', function () {
      console.log(`Fastest is ${this.filter('fastest').map('name')} for ${suiteName}`)
    })

  return suite
}

// Create benchmarks for both MyObject and MyHugeObject
const myObjectBenchmarks = setupBenchmarks('MyObject Benchmarks', MyObject)
const myHugeObjectBenchmarks = setupBenchmarks('MyHugeObject Benchmarks', MyHugeObject)

// Running benchmarks asynchronously
myObjectBenchmarks.run({ async: true })
myHugeObjectBenchmarks.run({ async: true })
