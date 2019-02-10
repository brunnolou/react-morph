## Simple example

```js
function Toggle() {
  // ... (toggle state should be handled normally)

  const morph = useMorph();

  return (
    <div>
      {toggle ? (
        <div className="myStyle" {...morph()}>
          Hello
        </div>
      ) : (
        <div className="myOtherStyle" {...morph()}>
          World
        </div>
      )}
    </div>
  );
}
```

## List transition (Many-to-One)

```js
```

## States in depth

### `ref={}` calls when:

#### The "From element" is unmounted (toggled)

| #   | Element | Mounted | Prev node | Action  |
| --- | ------- | ------- | --------- | ------- |
| 1   | From    | Yes     | .         | .       |
| 2   | From    | -       | Yes       | .       |
| 3   | To      | Yes     | Yes       | Animate |
| 4   | To      | .       | Yes       | .       |
| 5   | From    | Yes     | Yes       | Animate |
| ↻ 2 | From    | -       | Yes       | .       |

#### The "From element" is not unmounted

With `{ keepFrom: true }`

| #   | Element | Mounted | Prev node | Action       |
| --- | ------- | ------- | --------- | ------------ |
| 1   | From    | Yes     | .         | .            |
| 2   | To      | Yes     | Yes       | Animate      |
| 3   | To      | .       | Yes       | Animate back |
| ↻ 2 | To      | Yes     | Yes       | Animate      |
