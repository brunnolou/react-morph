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

## List transition (Many-to-1)

```js
```

## States in depth

| type         | node | previous | action  |
| ------------ | ---- | -------- | ------- |
| from mount   | y    | -        | -       |
| from unmount | -    | y        | cleanup |
| to mount     | y    | y        | animate |
