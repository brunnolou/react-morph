## States in depth

| type         | node | previous | action  |
| ------------ | ---- | -------- | ------- |
| from mount   | y    | -        | -       |
| from unmount | -    | y        | cleanup |
| to mount     | y    | y        | animate |
