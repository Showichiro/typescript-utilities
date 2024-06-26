import type { AssertTrue, IsExact } from "@std/testing/types";
import type {
  FillArray,
  FromPairs,
  IsTuple,
  RemoveItems,
  RemoveNElements,
  RemoveNElementsRight,
  Reverse,
  Slice,
  SliceRight,
  TupleRemoveItems,
} from "./types.ts";

Deno.test("IsTuple", () => {
  type _ = AssertTrue<IsExact<IsTuple<[1, 2, 3]>, true>>;
  type __ = AssertTrue<IsExact<IsTuple<number[]>, false>>;
});

Deno.test("RemoveNElements", () => {
  type _ = AssertTrue<
    IsExact<RemoveNElements<[1, 2, 3, 4, 5], 2>, [3, 4, 5]>
  >;
});

Deno.test("Slice", () => {
  type _ = AssertTrue<IsExact<Slice<[1, 2, 3, 4], 1>, [2, 3, 4]>>;
  type __ = AssertTrue<IsExact<Slice<number[], 1>, number[]>>;
});

Deno.test("Reverse", () => {
  type _ = AssertTrue<IsExact<Reverse<[1, 2, 3, 4]>, [4, 3, 2, 1]>>;
  type __ = AssertTrue<IsExact<Reverse<number[]>, number[]>>;
});

Deno.test("RemoveNElementsRight", () => {
  type _ = AssertTrue<
    IsExact<RemoveNElementsRight<[1, 2, 3, 4], 1>, [1, 2, 3]>
  >;
});

Deno.test("SliceRight", () => {
  type _ = AssertTrue<IsExact<SliceRight<[1, 2, 3, 4], 1>, [1, 2, 3]>>;
  type __ = AssertTrue<IsExact<SliceRight<number[], 1>, number[]>>;
});

Deno.test("FillArray", () => {
  type _1 = AssertTrue<IsExact<FillArray<0, string>, []>>;
  type _ = AssertTrue<IsExact<FillArray<1, string>, [string]>>;
  type __ = AssertTrue<IsExact<FillArray<2, string>, [string, string]>>;
  type ___ = AssertTrue<
    IsExact<FillArray<3, string>, [string, string, string]>
  >;
  type ____ = AssertTrue<
    IsExact<FillArray<4, string>, [string, string, string, string]>
  >;
  type _____ = AssertTrue<
    IsExact<FillArray<5, string>, [string, string, string, string, string]>
  >;
  type ______ = AssertTrue<
    IsExact<
      FillArray<6, string>,
      [string, string, string, string, string, string]
    >
  >;
  type _______ = AssertTrue<
    IsExact<
      FillArray<7, string>,
      [string, string, string, string, string, string, string]
    >
  >;
  type ________ = AssertTrue<
    IsExact<
      FillArray<8, string>,
      [string, string, string, string, string, string, string, string]
    >
  >;
  type _________ = AssertTrue<
    IsExact<
      FillArray<9, string>,
      [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ]
    >
  >;
  type __________ = AssertTrue<
    IsExact<
      FillArray<10, string>,
      [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ]
    >
  >;
  type ___________ = AssertTrue<
    IsExact<
      FillArray<11, string>,
      string[]
    >
  >;
});

Deno.test("FromPairs", () => {
  type _ = AssertTrue<
    IsExact<FromPairs<[["a", 1], [2, "b"]]>, { a: 1; 2: "b" }>
  >;
});

Deno.test("TupleRemoveItems", () => {
  type _ = AssertTrue<IsExact<TupleRemoveItems<[1, 2, 3], 3>, [1, 2]>>;
  type __ = AssertTrue<IsExact<TupleRemoveItems<[1, 2, 3], 2 | 3>, [1]>>;
  type ___ = AssertTrue<
    IsExact<TupleRemoveItems<[1, 2, "3"], number>, ["3"]>
  >;
});

Deno.test("RemoveItems", () => {
  type _ = AssertTrue<IsExact<RemoveItems<[1, 2, 3], 2>, [1, 3]>>;
  type __ = AssertTrue<IsExact<RemoveItems<[1, 2, 3], 2 | 3>, [1]>>;
  type ___ = AssertTrue<IsExact<RemoveItems<[1, 2, 3], 1 | 2 | 3>, []>>;
  type ____ = AssertTrue<IsExact<RemoveItems<number[], 1 | 2 | 3>, number[]>>;
  type _____ = AssertTrue<
    IsExact<RemoveItems<(number | string)[], 1 | 2 | 3>, (number | string)[]>
  >;
});
