# @livelybone/react-input
[![NPM Version](http://img.shields.io/npm/v/@livelybone/react-input.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-input)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/react-input.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-input)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A react input component, realized input validator, formatter. `textarea` available

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
import ReactInput from '@livelybone/react-input'

const Comp = () => <ReactInput type="text" preFormatter/></ReactInput>
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/react-input/lib/umd/)
```html
<script src="https://unpkg.com/@livelybone/react-input/lib/umd/index.js"></script>
```

## Props

### Common
| Name                      | Type                                      | DefaultValue                                  | Description  |
| ------------------------- | ----------------------------------------- | --------------------------------------------- | ------------ |
| `prop`                    | `type`                                    | none                                          | Description |


## Events
| Name              | EmittedData           | Description                                       |
| ----------------- | --------------------- | ------------------------------------------------- |
| `event`           | `type`                |  |

## style
For building style, you can use the css or scss file in lib directory.
```js
// scss
import 'node_modules/@livelybone/react-input/lib/css/index.scss'

// css
import 'node_modules/@livelybone/react-input/lib/css/index.css'
```
Or
```scss
// scss
@import 'node_modules/@livelybone/react-input/lib/css/index.scss'

// css
@import 'node_modules/@livelybone/react-input/lib/css/index.css'
```

Or, you can build your custom style by copying and editing `index.scss`

## QA

1. Error `Error: spawn node-sass ENOENT`

> You may need install node-sass globally, `npm i -g node-sass`
