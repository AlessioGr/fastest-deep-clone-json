This is the fastest deep-clone implementation for JSON objects - faster than `structuredClone`, `JSON.parse(JSON.stringify(obj))` and other implementations - see `deepCopyObjectIterative` here: https://www.measurethat.net/Benchmarks/ShowResult/534839

It avoids recursion in favor of a stack, in order to keep the memory usage low.

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
