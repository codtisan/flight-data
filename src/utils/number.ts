export function findNLowestWithIndices(
  numbers: number[],
  n: number,
): { price: number; index: number }[] {
  if (numbers.length < n || n < 1) {
    return []; // Not enough elements or invalid n
  }

  // Pair each number with its index
  const indexedNumbers = numbers.map((price, index) => ({ price, index }));

  // Sort by value
  indexedNumbers.sort((a, b) => a.price - b.price);

  // Get the first n elements
  return indexedNumbers.slice(0, n);
}
