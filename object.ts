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

import type { DeepMerge } from "./types.ts";

/**
 * Deeply merges two or more objects.
 *
 * @template T - The type of the first object.
 * @template U - The type of the second object.
 * @param {T} target - The first object to merge.
 * @param {U} source - The second object to merge.
 * @returns {DeepMerge<T, U>} A new object with all properties deeply merged.
 * @throws Will throw an error if any argument is not a non-null object.
 */
export const $deepMerge = <T extends object, U extends object>(
  target: T,
  source: U,
): DeepMerge<T, U> => {
  // 基本的な検証
  if (typeof target !== "object" || target === null) {
    throw new Error("expected a non-null object for the first argument");
  }
  if (typeof source !== "object" || source === null) {
    throw new Error("expected a non-null object for the second argument");
  }

  // 2つのオブジェクトをマージする内部関数
  const merge = <A extends object, B extends object>(
    target: A,
    source: B,
  ): DeepMerge<A, B> => {
    // 結果オブジェクトを作成
    const result = { ...target } as Record<PropertyKey, unknown>;

    // ソースオブジェクトのプロパティをマージ
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key as keyof B];
        const targetValue = key in target
          ? (target as Record<string, unknown>)[key]
          : undefined;

        if (
          targetValue !== null &&
          targetValue !== undefined &&
          sourceValue !== null &&
          sourceValue !== undefined &&
          typeof targetValue === "object" &&
          typeof sourceValue === "object"
        ) {
          if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            // 両方が配列の場合はマージ（連結）
            result[key] = [...targetValue, ...sourceValue] as unknown;
          } else if (
            !Array.isArray(targetValue) &&
            !Array.isArray(sourceValue)
          ) {
            // 両方がオブジェクト（配列でない）の場合は再帰的にマージ
            result[key] = merge(targetValue as object, sourceValue as object);
          } else {
            // 一方が配列で一方がオブジェクトの場合はソースの値で上書き
            result[key] = sourceValue;
          }
        } else {
          // それ以外の場合はソースの値で上書き
          result[key] = sourceValue;
        }
      }
    }

    return result as DeepMerge<A, B>;
  };

  return merge(target, source);
};
