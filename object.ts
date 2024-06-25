/**
 * Picks specified properties from an object.
 *
 * @template T - The type of the object.
 * @template E - The keys of the object to pick.
 * @param {T} obj - The object to pick properties from.
 * @param {E[]} props - The properties to pick.
 * @returns {Pick<T, E> | Pick<T, never>} A new object with the picked properties.
 * @throws Will throw an error if the first argument is not a non-null object.
 * @throws Will throw an error if the second argument is not an array.
 */
export const $pick = <T extends object, E extends keyof T>(
  obj: T,
  props: E[],
): Pick<T, E> => {
  // validation
  if (typeof obj !== "object" || obj === null) {
    throw new Error("expected a non-null object for a first argument");
  }

  if (!Array.isArray(props)) {
    throw new Error("expected an array for a second argument");
  }

  return props.reduce((prev, current) => {
    if (!(current in obj)) {
      return { ...prev };
    }
    return { ...prev, [current]: obj[current] };
  }, {} as Pick<T, E>);
};

/**
 * Omits specified properties from an object.
 *
 * @template T - The type of the object.
 * @template E - The keys of the object to omit.
 * @param {T} obj - The object to omit properties from.
 * @param {E[]} props - The properties to omit.
 * @returns {Omit<T, E>} A new object with the specified properties omitted.
 * @throws Will throw an error if the first argument is not a non-null object.
 * @throws Will throw an error if the second argument is not an array.
 */
export const $omit = <T extends object, E extends keyof T>(
  obj: T,
  props: E[],
): Omit<T, E> => {
  // validation
  if (typeof obj !== "object" || obj === null) {
    throw new Error("expected a non-null object for a first argument");
  }

  if (!Array.isArray(props)) {
    throw new Error("expected an array for a second argument");
  }
  const result = { ...obj };
  for (const key of props) {
    if (key in result) delete result[key];
  }
  return result;
};
