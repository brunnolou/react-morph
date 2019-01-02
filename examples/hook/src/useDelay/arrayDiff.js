export default function arrayDiff(arr1, arr2) {
  const diff = new Map();

  // Additions
  for (let i = 0; i < arr2.length; i++) {
    const key2 = arr2[i];

    diff.set(key2, { value: 1, index: i, key: key2 });
  }

  // Removals or kept
  for (let i = 0; i < arr1.length; i++) {
    const key1 = arr1[i];
    const wasKept = arr2.includes(key1);

    if (wasKept) {
      diff.set(key1, { value: 0, index: i, key: key1 });
    } else {
      diff.set(key1, { value: -1, index: i, key: key1 });
    }
  }

  return Array.from(diff.values()).sort((a, b) => a.index - b.index);
}
