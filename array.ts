import type {
  FillArray,
  FromPairs,
  Pair,
  Reverse,
  Slice,
  SliceRight,
} from "./types.ts";

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

/**
 * Splits an array into chunks of a specified size.
 *
 * @template T
 * @param {T[]} array - The array to be split into chunks.
 * @param {number} [size=1] - The size of each chunk.
 * @returns {T[][]} A new array containing sub-arrays of the specified size.
 * @throws {Error} If the first argument is not an array or if the second argument is not a number.
 */
export const $chunk = <T>(array: T[], size: number = 1): T[][] => {
  // validation
  if (!Array.isArray(array)) {
    throw new Error("expected an array for a first argument");
  }
  if (typeof size !== "number") {
    throw new Error("expected a number for a second argument");
  }

  return array.reduce<T[][]>(
    (arr, item, idx) =>
      idx % size === 0
        ? [...arr, [item]]
        : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]],
    [],
  );
};

/**
 * Filters out null and undefined values from the given array.
 *
 * @template T
 * @param {T[]} array - The array to be filtered.
 * @returns {NonNullable<T>[]} A new array without null and undefined values.
 * @throws {Error} If the input is not an array.
 */
export const $nonNull = <T>(array: T[]): NonNullable<T>[] => {
  // validation
  if (!Array.isArray(array)) {
    throw new Error("expected an array for a first argument");
  }
  return array.reduce<NonNullable<T>[]>((arr, current) => {
    return current != null ? [...arr, current] : arr;
  }, []);
};

/**
 * Concatenates the given array and values into a new array.
 *
 * @template T, E
 * @param {T[]} array - The array to be concatenated.
 * @param {...E[]} values - The values to concatenate to the array.
 * @returns {(T | E)[]} A new array consisting of the elements of the input array followed by the specified values.
 * @throws {Error} If the first argument is not an array.
 * @throws {Error} If the second argument is not an array.
 */
export const $concat = <T, E>(
  array: T[],
  ...values: E[]
): (T | E)[] => {
  if (!Array.isArray(array)) {
    throw new Error("expected an array for a first argument");
  }
  return [...array, ...values];
};

/**
 * Drops n elements from the beginning and returns rest from a given array.
 * @template T
 * @param {T} array - The array to be dropped.
 * @param {N} [size=1] - The size of elements to drop.
 * @returns {Slice<T, N>} dropped array
 * @throws {Error} If the first argument is not an array.
 * @throws {Error} If the second argument is not a number.
 */
export const $drop = <T extends unknown[], N extends number>(
  array: T,
  size: N = 1 as N,
): Slice<T, N> => {
  // validation
  if (!Array.isArray(array)) {
    throw new Error("expected an array for a first argument");
  }

  if (typeof size !== "number") {
    throw new Error("expected a number for a second argument");
  }

  return array.slice(size) as Slice<T, N>;
};

/**
 * Drops n elements from the end and returns rest from a given array.
 * @template T
 * @param {T} array - The array to be dropped.
 * @param {N} [size=1] - The size of elements to drop.
 * @returns {SliceRight<T, N>} dropped array
 * @throws {Error} If the first argument is not an array.
 * @throws {Error} If the second argument is not a number.
 */
export const $dropRight = <T extends unknown[], N extends number>(
  array: T,
  size: N = 1 as N,
): SliceRight<T, N> => {
  // validation
  if (!Array.isArray(array)) {
    throw new Error("expected an array for a first argument");
  }

  if (typeof size !== "number") {
    throw new Error("expected a number for a second argument");
  }

  return array.slice(0, -size) as SliceRight<T, N>;
};

/**
 * Reverses the order of elements in an array or tuple.
 *
 * @template T - The type of the input array or tuple.
 * @param {T} array - The array or tuple to be reversed.
 *
 * @throws {Error} If the input is not an array.
 *
 * @returns {Reverse<T>} A new array or tuple with the elements in reversed order.
 *          The return type preserves the input's tuple structure if applicable.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const reversedNumbers = $reverse(numbers);
 * // reversedNumbers is [5, 4, 3, 2, 1]
 *
 * const tuple = [1, 'two', true] as const;
 * const reversedTuple = $reverse(tuple);
 * // reversedTuple is [true, 'two', 1]
 *
 * @remarks
 * This function creates a shallow copy of the input array before reversing,
 * ensuring that the original array is not modified.
 * It uses type assertion to correctly type the output based on the input type.
 */
export const $reverse = <T extends unknown[]>(array: T): Reverse<T> => {
  // validation
  if (!Array.isArray(array)) {
    throw new Error("expected an array for a first argument");
  }
  return [...array].reverse() as Reverse<T>;
};

/**
 * Creates a new array or tuple filled with a static value.
 *
 * @template N - The length of the array to be created (must be a non-negative integer).
 * @template E - The type of the value to fill the array with.
 *
 * @param {E} val - The value to fill the array with.
 * @param {N} length - The length of the array to be created.
 *
 * @returns {FillArray<N, E>} A new array or tuple of the specified length with all elements set to the given value.
 *   - For lengths 0 to 10, returns a tuple with the exact number of elements.
 *   - For lengths greater than 10, returns a regular array (E[]).
 *
 * @throws {Error} If the length is not a non-negative integer.
 *
 * @example
 * const emptyArray = $fill(0, 0); // []
 * const smallTuple = $fill(0, 5); // [0, 0, 0, 0, 0]
 * const maxTuple = $fill('x', 10); // ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']
 * const largeArray = $fill(true, 20); // boolean[]
 */
export const $fill = <N extends number, E>(
  val: E,
  length: N,
): FillArray<N, E> => {
  if (!Number.isInteger(length) || length < 0) {
    throw new Error("expected a non-negative number for a second argument");
  }
  return Array(length).fill(val) as FillArray<N, E>;
};

/**
 * Converts an array of key-value pairs into an object.
 *
 * @template T - Array type of key-value pairs.
 * @param {T} pairs - An array of key-value pairs.
 * @returns {FromPairs<T>} An object with keys and values from the input pairs.
 *
 * @example
 * $fromPairs([['a', 1], ['b', 2]]); // { 'a': 1, 'b': 2 }
 * $fromPairs([['x', 'hello'], ['y', true]]); // { 'x': 'hello', 'y': true }
 *  * $fromPairs([['a', 1], ['a', 2]]); // { 'a': 2 }
 *
 * @remarks
 * If the same property name is specified more than once, the last one wins.
 */
export const $fromPairs = <T extends ReadonlyArray<Pair<PropertyKey, unknown>>>(
  pairs: T,
): FromPairs<T> => {
  if (!Array.isArray(pairs)) {
    throw new Error("expected an array for a first argument");
  }
  if (!pairs.every((pair) => Array.isArray(pair) && pair.length == 2)) {
    throw new Error("expected each element to be a tuple for key and value");
  }
  return pairs.reduce<FromPairs<T>>((obj, [key, value]) => {
    return { ...obj, [key]: value };
  }, {} as FromPairs<T>);
};
