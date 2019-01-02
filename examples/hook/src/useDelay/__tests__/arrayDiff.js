import arrayDiff from "../arrayDiff";

it("Should keep the same when equal", () => {
  const diff = arrayDiff(["a", "b", "c"], ["a", "b", "c"]);

  expect(diff).toEqual({
    a: 0,
    b: 0,
    c: 0
  });
});

it("Should remove last item", () => {
  const diff = arrayDiff(["a", "b", "c"], ["a", "b"]);

  expect(diff).toEqual({
    a: 0,
    b: 0,
    c: -1
  });
});

it("Should remove first item", () => {
  const diff = arrayDiff(["a", "b", "c"], ["b", "c"]);

  expect(diff).toEqual({
    a: -1,
    b: 0,
    c: 0
  });
});

it("Should remove middle item", () => {
  const diff = arrayDiff(["a", "b", "c"], ["a", "c"]);

  expect(diff).toEqual({
    a: 0,
    b: -1,
    c: 0
  });
});

it("Should add last item", () => {
  const diff = arrayDiff(["a", "b"], ["a", "b", "c"]);

  expect(diff).toEqual({
    a: 0,
    b: 0,
    c: 1
  });
});

it("Should add first item", () => {
  const diff = arrayDiff(["b", "c"], ["a", "b", "c"]);

  expect(diff).toEqual({
    a: 1,
    b: 0,
    c: 0
  });
});

it("Should add middle item", () => {
  const diff = arrayDiff(["a", "c"], ["a", "b", "c"]);

  expect(diff).toEqual({
    a: 0,
    b: 1,
    c: 0
  });
});

it("Should add 2 items", () => {
  const diff = arrayDiff(["b", "c"], ["a", "b", "c", "d"]);

  expect(diff).toEqual({
    a: 1,
    b: 0,
    c: 0,
    d: 1
  });
});

it("Should remove 2 items", () => {
  const diff = arrayDiff(["a", "b", "c", "d"], ["b", "c"]);

  expect(diff).toEqual({
    a: -1,
    b: 0,
    c: 0,
    d: -1
  });
});

it("Should add and remove items", () => {
  const diff = arrayDiff(["a", "b", "c"], ["b", "c", "d"]);

  expect(diff).toEqual({
    a: -1,
    b: 0,
    c: 0,
    d: 1
  });
});

it("Should shuffle items", () => {
  const diff = arrayDiff(["a", "b", "c"], ["b", "c", "a"]);

  expect(diff).toEqual({
    a: 0,
    b: 0,
    c: 0
  });
});
