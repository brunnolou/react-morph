# React morph

[![npm version](https://badge.fury.io/js/react-morph.svg?v2)](https://www.npmjs.com/package/react-morph)
![size](http://img.badgesize.io/brunnolou/react-morph/master/lib/all.min.js?compression=gzip&label=gzip+size)

## Usage

```sh
npm install react-morph
# or
yarn add react-morph
```

## Simple Example

```js
const CockpitSDK = require("react-morph").default;
// or
import CockpitSDK from "react-morph";

```



## Mind of
Sometimes:
- is necessary to create a placeholder element for the transition to avoid child distortion.
- Extra layers instead of child
- Sometimes list items could be miss calculated, a simple solution is: `list-style: none;`.
