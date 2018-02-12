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
import React from "react";
import ReactMorph from "react-morph";

const Component = () => (
  <ReactMorph>
    {({ from, to, fadeIn, go, init }) => (
      <div>
        <a {...from("title")} onClick={() => init(1)}>
          <strong>Zurich</strong>
        </a>

        <h1 {...to("title")}>Zurich</h1>

        <a {...fadeIn()} onClick={() => go(0)}>
          Back
        </a>
      </div>
    )}
  </ReactMorph>
);
```

## Take in mind

Sometimes:

* Is necessary to create a placeholder element for the transition to avoid child distortion.
* We need extra layers instead of nested children
* List items could be miss calculated, a simple solution is: `list-style: none;`.
