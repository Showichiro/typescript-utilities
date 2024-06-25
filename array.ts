type RecordKey = symbol | number | string;

/**
 * Groups the elements of an array by a specified key.
 *
 * @template T
 * @param {T[]} array - The array to be grouped.
 * @param {(v: T) => RecordKey} keyGenerator - A function that generates the key for grouping.
 * @returns {Record<RecordKey, T[]>} An object where each key is a group and the value is an array of items in that group.
 * @throws {Error} If the first argument is not an array.
 */
export const $groupBy = <T>(
  array: T[],
  keyGenerator: (v: T) => RecordKey,
): Record<RecordKey, T[]> => {
  // validation
  if (!Array.isArray(array)) {
    throw new Error("expected an array for a first argument");
  }
  if (typeof keyGenerator !== "function") {
    throw new Error("expected a function for a second argument");
  }
  const record: Record<RecordKey, T[]> = {};
  for (const item of array) {
    const key = keyGenerator(item);
    if (key in record) {
      record[key] = [...record[key], item];
    } else {
      record[key] = [item];
    }
  }
  return record;
};

/**
 * Returns a new array with all unique elements from the given array.
 *
 * @template T
 * @param {T[]} array - The array from which unique elements are to be extracted.
 * @param {(v: T) => string} [uniqueKeyGenerator] - An optional function to generate unique keys for comparison.
 * @returns {T[]} A new array containing only unique elements from the input array.
 * @throws {Error} If the first argument is not an array.
 */
export const $unique = <T>(
  array: T[],
  uniqueKeyGenerator?: (v: T) => string,
): T[] => {
  if (!Array.isArray(array)) {
    throw new Error("expected an array for a first argument");
  }
  if (
    uniqueKeyGenerator != null && typeof uniqueKeyGenerator !== "function"
  ) {
    throw new Error(
      "expected a function for a second argument or no second argument",
    );
  }
  if (!uniqueKeyGenerator) {
    return [...new Set(array)];
  }
  const record: Record<string, T[]> = array.reduce((prev, current) => {
    const key = uniqueKeyGenerator(current);
    return {
      ...prev,
      [key]: key in prev
        ? [...prev[key as keyof typeof prev], current]
        : [current],
    };
  }, {} satisfies Record<string, T[]>);
  let result: T[] = [];
  for (const key in record) {
    result = [...result, record[key][0]];
  }
  return result;
};
