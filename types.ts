/**
 * Determines that templete is tuple or array or others.
 * @template T
 * @returns {true | false} if T is tuple, it returns true. Else it returns false.
 */
export type IsTuple<T> = T extends readonly unknown[]
  ? number extends T["length"] ? false
  : true
  : false;

/**
 * Creates a new tuple with out n elements from a given tuple.
 * @template T, N, I
 * @returns a dropped tuple.
 */
export type RemoveNElements<
  T extends readonly unknown[],
  N extends number,
  I extends readonly unknown[] = [],
> = I["length"] extends N ? T
  : T extends [unknown, ...infer Rest]
    ? RemoveNElements<Rest, N, [...I, unknown]>
  : [];

/**
 * Creates a sliced tuple type with out n elements from a given tuple if T is tuple. Else Creates an array type.
 * @template T,N
 * @returns a sliced tuple type or an array type.
 */
export type Slice<T extends readonly unknown[], N extends number> =
  IsTuple<T> extends true ? RemoveNElements<T, N>
    : T extends readonly (infer E)[] ? E[]
    : never;

/**
 * Reverses the order of elements in a tuple or array type.
 *
 * @template T - The input tuple or array type to be reversed.
 *
 * @remarks
 * This type does the following:
 * 1. If T is a tuple, it recursively reverses the order of its elements.
 * 2. If T is a regular array, it returns an array of the same element type.
 * 3. If T is neither a tuple nor an array, it returns never.
 *
 * @example
 * type Original = [1, 'two', true];
 * type Reversed = Reverse<Original>; // [true, 'two', 1]
 *
 * type RegularArray = number[];
 * type SameArray = Reverse<RegularArray>; // number[]
 *
 * @returns A new type representing the reversed tuple,
 *          the same array type for regular arrays,
 *          or never for non-array types.
 */
export type Reverse<T extends readonly unknown[]> = IsTuple<T> extends true
  ? (T extends readonly [infer First, ...infer Rest] ? [...Reverse<Rest>, First]
    : [])
  : T extends readonly (infer E)[] ? E[]
  : never;

/**
 * Removes N elements from the right side of a tuple or array type.
 *
 * @template T - The input tuple or array type.
 * @template N - The number of elements to remove from the right.
 *
 * @remarks
 * This type utilizes the following steps:
 * 1. Reverses the input tuple/array using the `Reverse` type.
 * 2. Removes N elements from the left of the reversed tuple/array using `RemoveNElements`.
 * 3. Reverses the result again to get the final output.
 *
 * For regular arrays, it preserves the array type while removing elements.
 * For tuples, it accurately removes the rightmost N elements, preserving the tuple structure.
 *
 * @example
 * type Original = [1, 'two', true, 42, 'five'];
 * type Result = RemoveNElementsRight<Original, 2>; // [1, 'two', true]
 *
 * type RegularArray = number[];
 * type ArrayResult = RemoveNElementsRight<RegularArray, 3>; // number[]
 *
 * @returns A new type representing the input with N elements removed from the right,
 *          preserving the tuple structure if applicable, or the same array type for regular arrays.
 */
export type RemoveNElementsRight<
  T extends readonly unknown[],
  N extends number,
> = Reverse<RemoveNElements<Reverse<T>, N>>;

/**
 * Creates a new type by removing N elements from the right side of a tuple or array type.
 *
 * @template T - The input tuple or array type.
 * @template N - The number of elements to remove from the right.
 *
 * @remarks
 * This type does the following:
 * 1. If T is a tuple (determined by IsTuple<T>), it uses RemoveNElementsRight<T, N>
 *    to accurately remove N elements from the right, preserving the tuple structure.
 * 2. If T is a regular array, it returns an array of the same element type,
 *    regardless of N.
 * 3. If T is neither a tuple nor an array, it returns never.
 *
 * This type is particularly useful for typing functions that remove elements
 * from the end of an array or tuple, as it preserves type information more
 * accurately than built-in array methods.
 *
 * @example
 * type Tuple = [1, 'two', true, 42, 'five'];
 * type SlicedTuple = SliceRight<Tuple, 2>; // [1, 'two', true]
 *
 * type RegularArray = number[];
 * type SlicedArray = SliceRight<RegularArray, 3>; // number[]
 *
 * @returns A new type representing the input with N elements removed from the right,
 *          preserving the tuple structure if applicable, or the same array type for
 *          regular arrays. Returns never for non-array types.
 */
export type SliceRight<T extends readonly unknown[], N extends number> =
  IsTuple<T> extends true ? RemoveNElementsRight<T, N>
    : T extends readonly (infer E)[] ? E[]
    : never;

/**
 * Type definition for creating arrays or tuples of a specific length filled with a given type.
 * Provides exact tuple types for lengths 0 to 10, and falls back to E[] for larger lengths.
 */
export type FillArray<N extends number, E> = N extends 0 ? []
  : N extends 1 ? [E]
  : N extends 2 ? [E, E]
  : N extends 3 ? [E, E, E]
  : N extends 4 ? [E, E, E, E]
  : N extends 5 ? [E, E, E, E, E]
  : N extends 6 ? [E, E, E, E, E, E]
  : N extends 7 ? [E, E, E, E, E, E, E]
  : N extends 8 ? [E, E, E, E, E, E, E, E]
  : N extends 9 ? [E, E, E, E, E, E, E, E, E]
  : N extends 10 ? [E, E, E, E, E, E, E, E, E, E]
  : E[];

/**
 * Represents a pair of a key and a value.
 * @template K - Type of the key.
 * @template V - Type of the value.
 */
export type Pair<K extends PropertyKey, V> = readonly [K, V];

/**
 * Transforms an array or tuple of pairs into an object type.
 * @template T - The input array or tuple of pairs.
 * @returns An object type where keys are derived from the first elements of the pairs,
 *          and values are the second elements of the corresponding pairs.
 */
export type FromPairs<T extends ReadonlyArray<Pair<PropertyKey, unknown>>> = {
  [K in T[number][0]]: Extract<T[number], Pair<K, unknown>>[1];
};

/**
 * Removes items from a tuple that are assignable to a specified type.
 *
 * @template T - The tuple type from which to remove items.
 * @template U - The type of items to remove.
 *
 * @remarks
 * This type recursively evaluates the tuple type T and removes items
 * that are of the type U.
 *
 * @example
 * type OriginalTuple = [1, 'two', true, 42];
 * type FilteredTuple = TupleRemoveItems<OriginalTuple, number>; // ['two', true]
 *
 * @returns A new tuple type without the items of type U.
 */
export type TupleRemoveItems<
  T extends readonly Primitive[],
  U extends Primitive,
> = T extends [infer F, ...infer R]
  ? F extends U
    ? TupleRemoveItems<R extends readonly Primitive[] ? R : never, U>
  : [F, ...TupleRemoveItems<R extends readonly Primitive[] ? R : never, U>]
  : T;

/**
 * Removes items from an array or tuple that are assignable to a specified type.
 *
 * @template T - The array or tuple type from which to remove items.
 * @template U - The type of items to remove.
 *
 * @remarks
 * This type does the following:
 * 1. If T is a tuple (determined by IsTuple<T>), it uses TupleRemoveItems<T, U>
 *    to remove items of type U from the tuple.
 * 2. If T is not a tuple, it returns T unmodified.
 *
 * This type is useful for removing specific types from arrays or tuples, while preserving
 * the structure for tuples.
 *
 * @example
 * type ArrayType = (string | number | boolean)[];
 * type ResultArray = RemoveItems<ArrayType, boolean>; // (string | number | boolean)[]
 *
 * type TupleType = [1, 'two', true, 42, 'five'];
 * type ResultTuple = RemoveItems<TupleType, number>; // ['two', true, 'five']
 *
 * @returns A new type without the items of type U, preserving tuple structure if applicable,
 *          or T unmodified if T is not a tuple.
 */
export type RemoveItems<T extends Primitive[], U extends Primitive> =
  IsTuple<T> extends true ? TupleRemoveItems<T, U>
    : T;

/**
 * Represents primitive types in TypeScript.
 */
export type Primitive = string | number | boolean | symbol | null | undefined;

/**
 * Deeply merges two types, recursively combining their properties.
 *
 * @template T - The first type to merge.
 * @template U - The second type to merge.
 *
 * @remarks
 * This type does the following:
 * 1. If both T and U are objects, it recursively merges their properties.
 * 2. If either T or U is not an object, U takes precedence.
 * 3. For arrays, they are merged by creating a union of their element types.
 *
 * @example
 * type A = { a: number; b: { c: string; } };
 * type B = { b: { d: boolean; }; e: string; };
 * type Merged = DeepMerge<A, B>;
 * // { a: number; b: { c: string; d: boolean; }; e: string; }
 *
 * @returns A new type representing the deep merge of T and U.
 */
export type DeepMerge<T, U> = [T, U] extends [object, object]
  ? T extends readonly (infer T1)[]
    ? U extends readonly (infer U1)[] ? Array<T1 | U1> // 配列同士の場合は要素型をマージ
    : U
  : U extends readonly (infer U1)[] ? U
  : {
    [K in keyof T | keyof U]: K extends keyof U
      ? K extends keyof T
        ? T[K] extends object ? U[K] extends object ? DeepMerge<T[K], U[K]>
          : U[K]
        : U[K]
      : U[K]
      : K extends keyof T ? T[K]
      : never;
  }
  : U;
