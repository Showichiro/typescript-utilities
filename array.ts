import type {
  FillArray,
  FromPairs,
  Pair,
  Primitive,
  RemoveItems,
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
  if (uniqueKeyGenerator != null && typeof uniqueKeyGenerator !== "function") {
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

  return array.reduce<T[][]>((arr, item, idx) => {
    if (idx % size === 0) {
      arr.push([item]);
    } else {
      arr[arr.length - 1].push(item);
    }
    return arr;
  }, []);
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
export const $concat = <T, E>(array: T[], ...values: E[]): (T | E)[] => {
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

/**
 * Removes specified items from an array of primitive values.
 *
 * @template T - The type of the input array (must be an array of primitive values).
 * @template U - The type of the items to remove (must be a primitive value).
 *
 * @param {T} array - The input array to remove items from.
 * @param {...U[]} itemsToRemove - The items to remove from the array.
 *
 * @returns {RemoveItems<T, U>} A new array with the specified items removed.
 *
 * @example
 * const result = $removeItems([1, 2, 3, 4, 5], 2, 4);
 * console.log(result); // [1, 3, 5]
 *
 * @throws {Error} If the first argument is not an array.
 * @remarks This function may not correctly filter out non-primitive values.
 */
export const $removeItems = <T extends Primitive[], U extends Primitive>(
  array: T,
  ...itemsToRemove: U[]
): RemoveItems<T, U> => {
  if (!Array.isArray(array)) {
    throw new Error("expected an array for a first argument");
  }
  return array.filter((v) => !itemsToRemove.includes(v as U)) as RemoveItems<
    T,
    U
  >;
};

/**
 * Computes the intersection of multiple arrays.
 *
 * @template T
 * @param {T[][]} array - The array of arrays to find the intersection of.
 * @returns {T[]} A new array containing elements common to all input arrays.
 * @throws {Error} If the first argument is not an array of arrays.
 */
export const $intersection = <T>(array: T[][]): T[] => {
  if (!Array.isArray(array)) {
    throw new Error("expected an array of arrays for a first argument");
  }

  if (array.length === 0) {
    return [];
  }

  if (!array.every((subArray) => Array.isArray(subArray))) {
    throw new Error("expected each element to be an array");
  }

  return array.reduce((a, b) => a.filter(Set.prototype.has, new Set(b)));
};

/**
 * Computes the union of multiple arrays, retaining unique elements.
 *
 * @template T
 * @param {...T[][]} arrays - The arrays to compute the union of.
 * @returns {T[]} A new array containing the union of the unique elements from the input arrays.
 * @throws {Error} If any argument is not an array.
 * @remarks This function may not correctly handle non-primitive types.
 */
export const $union = <T extends Primitive>(...arrays: T[][]): T[] => {
  // validation
  if (!arrays.every((arr) => Array.isArray(arr))) {
    throw new Error("expected all arguments to be arrays");
  }
  return Array.from(new Set(arrays.flat()));
};

/**
 * Counts the occurrence of keys generated by `keyGenerator` function from each element in the array.
 *
 * @template T, E extends PropertyKey
 * @param {T[]} array - The array to process. Must be an array.
 * @param {(arg: T) => E} keyGenerator - Function to generate keys from the array elements. Must be a function.
 * @returns {Record<E, number>} An object where the results of `keyGenerator` are keys and their counts are values.
 */
export const $countBy = <T, E extends PropertyKey>(
  array: T[],
  keyGenerator: (arg: T) => E,
): Record<E, number> => {
  if (!Array.isArray(array)) {
    throw new Error("expected an array for the first argument");
  }
  if (typeof keyGenerator !== "function") {
    throw new Error("expected a function for the second argument");
  }

  return array.reduce<Record<E, number>>((prev, current) => {
    const key = keyGenerator(current);
    if (prev?.[key] == null) {
      prev[key] = 1;
    } else {
      prev[key]++;
    }
    return prev;
  }, {} as Record<E, number>);
};

/**
 * Sorts an array of objects based on specified keys and order directions.
 *
 * @template T
 * @template E extends [keyof T, "asc" | "desc"]
 * @param {T[]} array - The array to sort, an array of objects.
 * @param {...E[]} orders - Rest parameters specifying keys to sort by and their corresponding order ("asc" or "desc").
 * @returns {T[]} The sorted array.
 * @throws {Error} Throws an error if array is not an array or if keys and orders are not valid.
 */
export const $orderBy = <T extends object, E extends [keyof T, "asc" | "desc"]>(
  array: T[],
  ...orders: E[]
): T[] => {
  if (!Array.isArray(array)) {
    throw new Error("expected an array for the first argument");
  }
  for (const [key, order] of orders) {
    if (
      typeof key !== "string" &&
      typeof key !== "number" &&
      typeof key !== "symbol"
    ) {
      throw new Error("expected a valid key for sorting");
    }
    if (order !== "asc" && order !== "desc") {
      throw new Error("expected order to be either 'asc' or 'desc'");
    }
  }

  return [...array].sort((a, b) => {
    for (const [key, order] of orders) {
      if (a[key] < b[key]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return order === "asc" ? 1 : -1;
      }
    }
    return 0;
  });
};

/**
 * Randomly shuffles the elements of an array using the Fisher-Yates algorithm.
 *
 * @template T
 * @param {T[]} array - The array to be shuffled.
 * @returns {T[]} A new array with the same elements in a random order.
 * @throws {Error} If the first argument is not an array.
 */
export const $shuffle = <T>(array: T[]): T[] => {
  if (!Array.isArray(array)) {
    throw new Error("expected an array for a first argument");
  }

  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
