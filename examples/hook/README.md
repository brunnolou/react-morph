## Simple example

```js
function Simple() {
  // ... (toggle state should be handled normally)

  const morph = useMorph();

  return (
    <main>
      {toggle ? (
        <div className="myStyle" {...morph()}>
          Hello
        </div>
      ) : (
        <div className="myOtherStyle" {...morph()}>
          World
        </div>
      )}
    </main>
  );
}
```

## List transition (Many-to-One)

```js
```

## States in depth

### `ref={}` calls when from is unmounted (toggled)

| #   | Element | Mounted | Prev node | Action  |
| --- | ------- | ------- | --------- | ------- |
| 1   | From    | Yes     | .         | .       |
| 2   | From    | -       | Yes       | .       |
| 3   | To      | Yes     | Yes       | Animate |
| 4   | To      | .       | Yes       | .       |
| 5   | From    | Yes     | Yes       | Animate |
| 2   | From    | -       | Yes       | .       |

### Without unmounting FromNode `ref={}` calls

| #   | Element | Mounted | Prev node | Action  |
| --- | ------- | ------- | --------- | ------- |
| 1   | From    | Yes     | .         | .       |
| 2   | To      | Yes     | Yes       | Animate |
| 3   | To      | .       | Yes       | .       |


.

.

---

### `ref={}` calls

| type             | node | previous | action  |
| ---------------- | ---- | -------- | ------- |
| FromNode mount   | y    | –        | –       |
| FromNode unmount | –    | y        | cleanup |
| ToNode mount     | y    | y        | animate |

### Without unmounting FromNode `ref={}` calls

| type           | node | previous | action  |
| -------------- | ---- | -------- | ------- |
| FromNode mount | y    | –        | –       |
| ToNode mount   | y    | y        | animate |
