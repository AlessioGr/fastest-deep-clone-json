This is the fastest deep-clone implementation for JSON objects - faster than `structuredClone`, `JSON.parse(JSON.stringify(obj))` and other implementations: https://www.measurethat.net/Benchmarks/Show/31442/0/jsonstringify-vs-structuredclone-vs-simple-deepcopyobje

It avoids recursion in favor of a stack, in order to keep the memory usage low.

## Installation

```bash
pnpm install fast-json-clone
```
or

```bash
npm install fast-json-clone
```
