# React morph

[![npm version](https://badge.fury.io/js/react-morph.svg?v0)](https://www.npmjs.com/package/react-morph)
![size](http://img.badgesize.io/brunnolou/react-morph/master/lib/all.min.js?compression=gzip&label=gzip+size&v)

## Usage

```sh
npm install react-morph
# or
yarn add react-morph
```

## Simple Example

1. Create two states as you normally do (HTML + CSS).
2. Wrap both with `<ReactMorph>`
3. Label the elements you wanna morph with `from("any-key")` and `to("any-key")`
4. Perform the magic with `go(0...1)`

```js
import React from "react";
import ReactMorph from "react-morph";
```

```jsx
<ReactMorph>
  {({ from, to, fadeIn, go }) => (
    <div>
      <a onClick={() => go(1)}>
        <strong {...from("title")}>Zurich</strong>
        <br />
        <p {...from("description")}>Panorama Grossmünster limmat river</p>
      </a>

      <div>
        <h1 {...to("title")}>Zurich</h1>
        <br />
        <h2 {...to("description")}>Panorama Grossmünster limmat river</h2>

        <a onClick={() => go(0)} {...fadeIn()}>
          Back
        </a>
      </div>
    </div>
  )}
</ReactMorph>
```

## Features

* Simplicity
* No hardcoded absolute positions
* All GPU accelerated props
* No Layout or Paint browser rendering

## Take in mind

Sometimes:

* You need `display: inline-block` to remove extra white spaces, to match the real element's width.
* It's necessary to create a placeholder element for the transition to avoid child distortion.
* We need extra layers instead of nested children.
* List items could be miss calculated, a simple solution is: `list-style: none;`.
