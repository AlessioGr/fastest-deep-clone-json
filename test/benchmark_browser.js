import {
  copy,
  deepCopyObjectSimple,
  clone,
  MyObject,
  copyv2,
  deepCopyObject,
  rfdc,
  clone3,
  MyHugeObject,
} from './benchmarkSetup.js' // Adjust the path as necessary

// Assuming deepCloneJson is a variant of deep copy, if it exists
import { deepCloneJson } from '../dist/index.js'

function benchmark(copyFunction, objectToCopy, numIterations = 10000) {
  let totalDuration = 0
  let result

  for (let i = 0; i < numIterations; i++) {
    let startTime = performance.now()
    result = copyFunction(objectToCopy)
    let endTime = performance.now()
    totalDuration += endTime - startTime
  }

  const averageTime = totalDuration / numIterations
  const opsPerSecond = 1000 / averageTime

  return opsPerSecond // Just return the computed ops/sec
}

function runBenchmarks(objectToCopy, numIterations) {
  const functions = [
    { name: 'JSON.stringify/parse', func: (obj) => JSON.parse(JSON.stringify(obj)) },
    { name: 'structuredClone', func: (obj) => structuredClone(obj) },
    { name: 'deepCopyObject', func: deepCopyObject },
    { name: 'deepCopyObjectSimple', func: deepCopyObjectSimple },
    { name: 'copy', func: copy },
    { name: 'clone', func: clone },
    { name: 'deepCopyObjectIterative', func: deepCloneJson },
    { name: 'copyv2', func: copyv2 },
    { name: 'clone3', func: clone3 },
    { name: 'rfdc', func: rfdc },
  ]

  const results = functions.map((f) => ({
    name: f.name,
    opsPerSecond: benchmark(f.func, objectToCopy, numIterations),
  }))

  results.sort((a, b) => b.opsPerSecond - a.opsPerSecond)

  const resultsElement = document.getElementById('benchmark-results')
  resultsElement.innerHTML =
    `Benchmarking results for ${objectToCopy === MyObject ? 'MyObject' : 'MyHugeObject'}:\n\n` +
    results.map((result) => `${result.name}: ${result.opsPerSecond.toFixed(2)} Ops/sec`).join('\n')
}

document.getElementById('run-benchmark').addEventListener('click', () => {
  console.log('Starting benchmarks...')
  runBenchmarks(MyObject, 100000) // Adjust iterations as needed
  runBenchmarks(MyHugeObject, 1000)
})
