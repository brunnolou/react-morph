# React Morph ️🦋

#### Morphing UI transitions made simple

[![npm version](https://badge.fury.io/js/react-morph.svg?v0)](https://www.npmjs.com/package/react-morph)
![size](http://img.badgesize.io/brunnolou/react-morph/master/lib/all.min.js?compression=gzip&label=gzip+size&v)

## Usage 🐛

```sh
npm install react-morph
# or
yarn add react-morph
```

## Simple Example

1. Create two states as you normally would (HTML + CSS).
2. Wrap both in one `<ReactMorph>`
3. Label the elements you wanna morph with `from("a-key")` and `to("a-key")`
4. Perform the magic with `go(0)` or `go(1)`

```js
import React from "react";
import ReactMorph from "react-morph";
```

```jsx
<ReactMorph>
  {({ from, to, fadeIn, go }) => (
    <div>
      <a onClick={() => go(1)}>
        <strong {...from("title")}>ReactMorph 🐛</strong>
        <br />
        <p {...from("description")}>Morphing transitions was never so easy!</p>
      </a>

      <div>
        <h1 {...to("title")}>ReactMorph 🦋</h1>
        <br />
        <h2 {...to("description")}>Morphing transitions was never so easy!</h2>

        <a onClick={() => go(0)} {...fadeIn()}>
          Back
        </a>
      </div>
    </div>
  )}
</ReactMorph>
```

## Features 🌟

* Simplicity
* No hardcoded absolute positions
* All GPU accelerated props
* No layout or paint browser rendering

## Keep in mind

Caveats:

* You need to remove extra whitespace, to match the real element's width, the solution is `display: inline-block` or a wrapping element to the content.
* Margins are always tricky because they create extra white space. You can either wrap the content in another element and animate it or be sure to match both the margins in both states.
* Sometimes it's necessary to create a placeholder element for the transition to avoid child distortion.
* List items could be miscalculated; a simple solution is: `list-style: none;`.
* Sometimes you need extra layers instead of nested children.
* Avoid animating both the parent and children to avoid unpredicted results.

## [Live Demos](https://brunnolou.github.io/react-morph/?down=0)

### Sandbox

* [Simple text](https://codesandbox.io/s/j2rjln010w)

* [Morphing from card to details](https://codesandbox.io/s/96x66mr6w)

[![Edit j2rjln010w](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/j2rjln010w)

## TODO

> **Warning** wip

* [ ] Add a `styled-components` example
* [ ] Recalculate positions on window resize
* [ ] ? Optional portal for the second state ?
