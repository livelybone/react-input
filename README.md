# @livelybone/react-input
[![NPM Version](http://img.shields.io/npm/v/@livelybone/react-input.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-input)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/react-input.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-input)
![gzip with dependencies: 1kb](https://img.shields.io/badge/gzip--with--dependencies-1kb-brightgreen.svg "gzip with dependencies: 1kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A react input component, default to disabled change event when composition event triggered

## repository
https://github.com/livelybone/react-input.git

## Demo
https://github.com/livelybone/react-input#readme

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/react-input.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/react-input
```

## Global name
`ReactInput`

## Interface
See in [index.d.ts](./index.d.ts)

## Usage
```typescript jsx
import React from 'react'
import ReactInput from '@livelybone/react-input'

const Comp = () => {
  return (
    <ReactInput
      type="text"
      shouldCompositionEventTriggerChangeEvent={false}
      onChange={(ev) => console.log('onChange', ev, ev.target.value, ev.type)}
      onCompositionEnd={(ev) => {
        console.log('onCompositionEnd', ev.target.value, ev)
      }}
    />
  )
}
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/react-input/lib/umd/)
```html
<script src="https://unpkg.com/@livelybone/react-input/lib/umd/index.js"></script>
```
