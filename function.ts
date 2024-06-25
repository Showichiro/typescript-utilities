/**
 * Memoizes a function with a custom serializer.
 *
 * @template T - Argument types of the function to memoize.
 * @template E - Return type of the function to memoize.
 * @param {(...args: T[]) => E} fn - The function to memoize.
 * @param {(...args: T[]) => string} serializer - A function that generates a cache key based on the arguments.
 * @returns {(...args: T[]) => E} - A memoized version of the function.
 * @throws {Error} - If the first argument is not a function.
 * @throws {Error} - If the second argument is not a function.
 */
export const $memorize = <T extends unknown, E>(
  fn: (...args: T[]) => E,
  serializer: (...args: T[]) => string,
): (...args: T[]) => E => {
  // validation
  if (typeof fn !== "function") {
    throw new Error("expected a function for a first argument");
  }

  if (typeof serializer !== "function") {
    throw new Error("expected a function for a second argument");
  }

  const memo: Record<string, E> = {};
  return (...args: T[]) => {
    const serialized = serializer(...args);
    if (serialized in memo) {
      return memo[serialized];
    }
    const result = fn(...args);
    memo[serialized] = result;
    return result;
  };
};
