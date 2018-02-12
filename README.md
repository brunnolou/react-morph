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
    {({ from, to, fadeIn, fadeOut, go, init }) => (
      <div>
        <a onClick={() => init(1)} {...from("title")}>
          <strong>Zurich</strong>
        </a>
        <p {...from("description")}>Panorama Grossmünster limmat river</p>

        <div>
          <h1 {...to("title")}>Zurich</h1>
          <h2 {...to("description")}>Panorama Grossmünster limmat river</h2>

          <a onClick={() => go(0)} href="#/back" {...fadeIn()}>
            Back
          </a>
        </div>
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
