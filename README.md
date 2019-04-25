# React Morph ️🦋

#### Morphing UI transitions made simple

[![npm version](https://badge.fury.io/js/react-morph.svg?v0)](https://www.npmjs.com/package/react-morph)

<img src="https://github.com/brunnolou/react-morph/blob/master/examples/react-morph-simple.gif" width="300">

Magically animates one element into another just by tagging the first and last state.

## Getting Started 🐛

```sh
npm install react-morph
# or
yarn add react-morph
```

Import the `useMorph` hook.

```js
const morph = useMorph(options);
```

Then spread the props to the elements you want to morph.

```jsx
<img {...morph} src="larva.png" width="50">
```

```jsx
<img {...morph} src="butterfly.png" width="80">
```

> Make sure you have just **ONE element rendered at same time**.

## Simple Example 🦋

1. Create two states as you normally would (HTML + CSS).
2. Call `useMorph` hook.
3. Spread the elements you want to morph with `{...morph}`
4. Add and remove the element from the DOM

```js
import React from 'react';
import { useMorph } from 'react-morph';
```

```jsx
() => {
  // Handle toggle state as you normally would.
  const [toggle, setToggle] = useState(true);
  const morph = useMorph();

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Let's morph!</button>
      <br />

      {toggle ? (
        <img {...morph} src={larva} width="30" />
      ) : (
        <img {...morph} src={butterfly} width="80" />
      )}
    </div>
  );
};
```

## [Documentation](https://brunnolou.github.io/react-morph)

Please check the [documentation](https://brunnolou.github.io/react-morph).

## Features 🌟

- Simplicity
- No hardcoded absolute positions
- All GPU accelerated props
- No layout or paint browser rendering

## Live Demos

- [Hello world](https://codesandbox.io/s/yqyymqn8z1)
- [Apple App Store](https://codesandbox.io/s/7ywk4o0xmj)
