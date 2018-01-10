export function sortNumber(a, b) {
  return a - b;
}

export function flatten(array) {
  return [].concat(...array);
}

test('sortNumber', () => {
  expect(sortNumber(3, 1)).toEqual(2);
});
test('flatten', () => {
  expect(flatten([[3], [1]])).toEqual([3, 1]);
});
