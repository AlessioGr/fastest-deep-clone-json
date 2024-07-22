This is the fastest deep-clone implementation for JSON objects - faster than `structuredClone`, `JSON.parse(JSON.stringify(obj))` and other implementations, according to www.measurethat.net.

This package is ESM-only.

- **Dependencies**: 0
- **Bundle size (minified and gzipped)**: 316 Bytes
- **Module count**: 1

It avoids recursion in favor of a stack, in order to keep the memory usage low.

## Performance comparison

| Method                                                                                                            | Ops/sec   |
|-------------------------------------------------------------------------------------------------------------------|-----------|
| This package (iterative deep clone)                                                                               | 3.560.061 |
| recursive deep clone                                                                                              | 3.476.448 |
| [fastest-json-copy v2](https://github.com/streamich/fastest-json-copy/blob/main/lib/v2.js)                        | 1.523.427 |
| JSON.stringify                                                                                                    | 1.465.516 |
| [fastest-json-copy v1](https://github.com/streamich/fastest-json-copy/blob/main/lib/v1.js)                        | 1.320.249 |
| [jsondiffpatch.clone](https://github.com/benjamine/jsondiffpatch/blob/master/packages/jsondiffpatch/src/clone.ts) | 1.245.459 |
| structuredClone                                                                                                   | 789.100   |

Run it yourself: https://www.measurethat.net/Benchmarks/ShowResult/534839 (this package is `deepCopyObjectIterative` in that comparison).

When running the local benchmark, the results are very different and [jsondiffpatch.clone](https://github.com/benjamine/jsondiffpatch/blob/master/packages/jsondiffpatch/src/clone.ts) becomes the fastest.

## Installation

```bash
pnpm install fastest-deep-clone-json
```
or

```bash
npm install fastest-deep-clone-json
```

## Usage

```ts
import { deepCloneJson } from 'fastest-deep-clone-json';

const obj = { a: 1, b: { c: 2 } };

const cloned = deepCloneJson(obj);

console.log(cloned); // { a: 1, b: { c: 2 } }
```

This library will only work with JSON-serialized objects. It does not handle data types like `Date`, `Map`, `Set`, `BigInt`, `Symbol`, `Function` etc etc. The goal is to provide the fastest deep-clone implementation for JSON objects.
