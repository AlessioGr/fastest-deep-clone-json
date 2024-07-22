import {
  copy,
  deepCopyObjectSimple,
  clone,
  clone3WithDates,
  MyObject,
  copyv2,
  deepCopyObject,
  MyHugeObject,
  rfdc,
  clone3,
  clone3WithDatesStrings,
} from './benchmarkSetup.js'
import { deepCloneJson } from '../dist/index.js'

function benchmark(copyFunction, objectToCopy, numIterations = 10000) {
  let totalDuration = 0
  let result

  // Warm-up phase: Run a few iterations to stabilize optimizations
  for (let i = 0; i < 100; i++) {
    result = copyFunction(objectToCopy)
  }

  // Benchmarking phase
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
    { name: 'deepCopyObjectIterative', func: deepCloneJson },
    { name: 'copy', func: copy },
    { name: 'clone', func: clone },
    { name: 'copyv2', func: copyv2 },
    { name: 'clone3', func: clone3 },
    { name: 'clone3WithDates', func: clone3WithDates },
    { name: 'clone3WithDatesStrings', func: clone3WithDatesStrings },
    { name: 'rfdc', func: rfdc },
  ]

  // Collect all results
  const results = functions.map((f) => ({
    name: f.name,
    opsPerSecond: benchmark(f.func, objectToCopy, numIterations),
  }))

  // Sort results by ops/sec in descending order
  results.sort((a, b) => b.opsPerSecond - a.opsPerSecond)

  // Output the sorted results
  console.log(
    `\n\nBenchmarking results for ${objectToCopy === MyObject ? 'MyObject' : 'MyHugeObject'}:\n`,
  )
  results.forEach((result) => {
    console.log(`${result.name}: ${result.opsPerSecond.toFixed(2)} Ops/sec`)
  })
}

console.log('Starting benchmarks...')
runBenchmarks(MyObject, 1000000) // For MyObject, run 10,000 iterations
runBenchmarks(MyHugeObject, 1000) // For MyHugeObject, run 1,000 iterations due to complexity
