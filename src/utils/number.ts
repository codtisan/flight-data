export function findNLowestWithIndices(numbers: number[], n: number): { price: number; index: number }[] {
  if (numbers.length < n || n < 1) {
    return [];
  }

  const indexedNumbers = numbers.map((price, index) => ({ price, index }));

  indexedNumbers.sort((a, b) => a.price - b.price);

  return indexedNumbers.slice(0, n);
}
