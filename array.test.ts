import {
  $chunk,
  $concat,
  $drop,
  $dropRight,
  $fill,
  $fromPairs,
  $groupBy,
  $intersection,
  $nonNull,
  $removeItems,
  $reverse,
  $union,
  $unique,
} from "./array.ts";
import { assertEquals } from "@std/assert/assert-equals";
import { assertThrows } from "@std/assert/assert-throws";

Deno.test("$groupBy", () => {
  const test1 = $groupBy([{ type: "a", value: 1 }, { type: "a", value: 1 }, {
    type: "b",
    value: 1,
  }, { type: "c", value: 1 }], (v) => v.type);
  assertEquals(test1, {
    a: [
      {
        type: "a",
        value: 1,
      },
      {
        type: "a",
        value: 1,
      },
    ],
    b: [
      {
        type: "b",
        value: 1,
      },
    ],
    c: [
      {
        type: "c",
        value: 1,
      },
    ],
  });
  const test2 = $groupBy([1, 1.2, 2, 2.4, 3], Math.floor);
  assertEquals(test2, {
    "1": [
      1,
      1.2,
    ],
    "2": [
      2,
      2.4,
    ],
    "3": [
      3,
    ],
  });
  const test3 = $groupBy(
    [[1], [2], [1, 2]],
    (arr) => arr.length,
  );
  assertEquals(test3, {
    1: [[1], [2]],
    2: [[1, 2]],
  });
  const test4 = $groupBy([], () => "a");
  assertEquals(test4, {});
  const test5 = $groupBy(
    [1, 2, 3, "1", "2"],
    (a) => a,
  );
  assertEquals(test5, {
    "1": [
      1,
      "1",
    ],
    "2": [
      2,
      "2",
    ],
    "3": [
      3,
    ],
  });
});

Deno.test("$groupBy with invalid arguments", () => {
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $groupBy(undefined),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $groupBy(null),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $groupBy(123),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $groupBy("string"),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $groupBy([], "string"),
    "expected a function for a second argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $groupBy([], null),
    "expected a function for a second argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $groupBy([], undefined),
    "expected a function for a second argument",
  );
});

Deno.test("$unique", () => {
  const test1: number[] = $unique([1, 2, 3, 2, 3, 4, 3, 2, 1, 3]);
  assertEquals(test1, [1, 2, 3, 4]);
  const test2 = $unique(["a", "a", "b", "c", "b"]);
  assertEquals(test2, ["a", "b", "c"]);
  const test3 = $unique([1, "1", 2, "2", 3, 2]);
  assertEquals(test3, [1, "1", 2, "2", 3]);
  const test4 = $unique([true, true, false, false, true]);
  assertEquals(test4, [true, false]);
  const test5 = $unique([NaN, NaN, NaN]);
  assertEquals(test5, [NaN]);
  const test6 = $unique([
    { name: "JohnDoe", age: 25 },
    {
      name: "JohnDoe",
      age: 25,
    },
    { name: "JohnDoe", age: 25 },
    { name: "JaneDoe", age: 25 },
    { name: "JaneDoe", age: 30 },
  ], (v) => `${v.name}-${v.age}`);
  assertEquals(test6, [
    { name: "JohnDoe", age: 25 },
    { name: "JaneDoe", age: 25 },
    { name: "JaneDoe", age: 30 },
  ]);
  const test7 = $unique([
    { name: "JohnDoe", age: 25 },
    {
      name: "JohnDoe",
      age: 25,
    },
    { name: "JohnDoe", age: 25 },
    { name: "JaneDoe", age: 25 },
    { name: "JaneDoe", age: 30 },
  ], (v) => `${v.name}`);
  assertEquals(test7, [
    { name: "JohnDoe", age: 25 },
    { name: "JaneDoe", age: 25 },
  ]);
});

Deno.test("$unique with invalid arguments", () => {
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $unique(),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $unique(null),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $unique(123),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $unique("string"),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $unique([], "string"),
    "expected a function for a second argument or no second argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $unique([], 123),
    "expected a function for a second argument or no second argument",
  );
});

Deno.test("$chunk", () => {
  const test1 = $chunk([1, 2, 3, 4, 5], 2);
  assertEquals(test1, [[1, 2], [3, 4], [5]]);
  const test2 = $chunk([], 2);
  assertEquals(test2, []);
  const test3 = $chunk([1, 2, 3], 4);
  assertEquals(test3, [[1, 2, 3]]);
  const test4 = $chunk([{}, {}, {}], 2);
  assertEquals(test4, [
    [{}, {}],
    [{}],
  ]);

  const test5 = $chunk([1, 2, 3, 4, 5], undefined);
  assertEquals(test5, [[1], [2], [3], [4], [5]]);
});

Deno.test("$chunk with invalid arguments", () => {
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  assertThrows(() => $chunk(null), "expected an array for a first argument");
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $chunk(undefined),
    "expected an array for a first argument",
  );
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  assertThrows(() => $chunk(123), "expected an array for a first argument");
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $chunk("string"),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $chunk([], "string"),
    "expected a number for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $chunk([], null),
    "expected a number for a second argument",
  );
});

Deno.test("$nonNull", () => {
  const test1 = $nonNull([1, 2, 3, undefined, null, 0]);
  assertEquals(test1, [1, 2, 3, 0]);
  const test2 = $nonNull([{}, [], 0, null, undefined, NaN]);
  assertEquals(test2, [{}, [], 0, NaN]);
});

Deno.test("$nonNull with invalid arguments", () => {
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  assertThrows(() => $nonNull(null), "expected an array for a first argument");

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $nonNull(undefined),
    "expected an array for a first argument",
  );

  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  assertThrows(() => $nonNull(123), "expected an array for a first argument");

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $nonNull("string"),
    "expected an array for a first argument",
  );
});

Deno.test("$concat", () => {
  const test1 = $concat([1, 2, 3, 4], 5, 6);
  assertEquals(test1, [1, 2, 3, 4, 5, 6]);
  const test2 = $concat([1, 2, 3], {}, []);
  assertEquals(test2, [1, 2, 3, {}, []]);
});

Deno.test("$concat with invalid arguments", () => {
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  assertThrows(() => $concat(null), "expected an array for a first argument");
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $concat(undefined),
    "expected an array for a first argument",
  );
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  assertThrows(() => $concat({}), "expected an array for a first argument");
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  assertThrows(() => $concat("abc"), "expected an array for a first argument");
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  assertThrows(() => $concat(1234), "expected an array for a first argument");
});

Deno.test("$drop", () => {
  const test1 = $drop([1, 2, 3, 4], 2);
  assertEquals(test1, [3, 4]);
  const test2 = $drop([1, 2, 3, 4]);
  assertEquals(test2, [2, 3, 4]);
  const test3 = $drop([], 1);
  assertEquals(test3, []);
  const test4 = $drop([1, 2, 3, 4], 0);
  assertEquals(test4, [1, 2, 3, 4]);
  const test5 = $drop([1, 2, 3, 4], 5);
  assertEquals(test5, []);
  const test6 = $drop([1, 2, 3, 4] as const, 2);
  assertEquals(test6, [3, 4]);
  const test7 = $drop([1, 2, 3, 4] as const, undefined);
  assertEquals(test7, [2, 3, 4]);
});

Deno.test("$drop with invalid arguments", () => {
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  assertThrows(() => $drop(null), "expected an array for a first argument");
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $drop(undefined),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $drop("abc"),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $drop(123),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $drop([], null),
    "expected a number for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $drop([], "abc"),
    "expected a number for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $drop([], {}),
    "expected a number for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $drop([], []),
    "expected a number for a second argument",
  );
});

Deno.test("$dropRight", () => {
  const test1 = $dropRight([1, 2, 3, 4], 1);
  assertEquals(test1, [1, 2, 3]);
  const test2 = $dropRight([1, 2, 3, 4]);
  assertEquals(test2, [1, 2, 3]);
  const test3 = $dropRight([], 1);
  assertEquals(test3, []);
  const test4 = $dropRight([1, 2, 3, 4], 0);
  assertEquals(test4, []);
  const test5 = $dropRight([1, 2, 3, 4], 5);
  assertEquals(test5, []);
  const test6 = $dropRight([1, 2, 3, 4] as const, 2);
  assertEquals(test6, [1, 2]);
  const test7 = $dropRight([1, 2, 3, 4] as const, undefined);
  assertEquals(test7, [1, 2, 3]);
});

Deno.test("$dropRight with invalid arguments", () => {
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $dropRight(null),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $dropRight(undefined),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $dropRight("abc"),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $dropRight(123),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $dropRight([], null),
    "expected a number for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $dropRight([], "abc"),
    "expected a number for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $dropRight([], {}),
    "expected a number for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $dropRight([], []),
    "expected a number for a second argument",
  );
});

Deno.test("$reverse", () => {
  const test1 = $reverse([1, 2, 3, 4]);
  assertEquals(test1, [4, 3, 2, 1]);
  const test2 = $reverse([1, 2, 3, 4] as const);
  assertEquals(test2, [4, 3, 2, 1]);
  const test3 = $reverse([]);
  assertEquals(test3, []);
});

Deno.test("$reverse with invalid arguments", () => {
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  assertThrows(() => $reverse(), "expected an array for a first argument");
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $reverse(undefined),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $reverse(null),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $reverse("abc"),
    "expected an array for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $reverse(123),
    "expected an array for a first argument",
  );
});

Deno.test("$fill", () => {
  const test1 = $fill("a", 3);
  assertEquals(test1, ["a", "a", "a"]);
  const test2 = $fill(0, 0);
  assertEquals(test2, []);
  const test3 = $fill(1, 100);
  assertEquals(test3, [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ]);
});

Deno.test("$fromPairs", () => {
  const test1 = $fromPairs([["a", 1], [2, "b"]] as const);
  assertEquals(test1, {
    a: 1,
    2: "b",
  });
  const test2 = $fromPairs([]);
  assertEquals(test2, {});
  const test3 = $fromPairs([["a", 1], ["a", 2]]);
  assertEquals(test3, { a: 2 });
});

Deno.test("$fromPairs with invalid arguments", () => {
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $fromPairs(null),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $fromPairs(undefined),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $fromPairs(123),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $fromPairs("string"),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $fromPairs([1, 2, 3]),
    "expected each element to be a tuple for key and value",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $fromPairs([[1], [2], 3]),
    "expected each element to be a tuple for key and value",
  );
});

Deno.test("$removeItems", () => {
  const test1 = $removeItems([1, 2, 3, 4, 5], 2, 4);
  assertEquals(test1, [1, 3, 5]);

  const test2 = $removeItems([1, "2", "3", "4", "5"], "2", "4");
  assertEquals(test2, [1, "3", "5"]);

  const test3 = $removeItems([1, 2, 3] as const, 2);
  assertEquals(test3, [1, 3]);

  const test4 = $removeItems(["1", "2", "3", "4", "5"], "2", "4");
  assertEquals(test4, ["1", "3", "5"]);
});

Deno.test("$removeItems with invalid arguments", () => {
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $removeItems(null, 1),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $removeItems(undefined, 1),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $removeItems("string", 1),
    "expected an array for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $removeItems(123, 1),
    "expected an array for a first argument",
  );
});

Deno.test("$intersection", () => {
  const array1 = [1, 2, 3];
  const array2 = [2, 3, 4];
  const expectedIntersection = [2, 3];
  const result = $intersection([array1, array2]);
  assertEquals(
    result,
    expectedIntersection,
  );

  const array3: never[] = [];
  const array4 = [1, 2, 3];
  const expectedIntersectionEmpty: never[] = [];
  const resultEmpty = $intersection([array3, array4]);
  assertEquals(
    resultEmpty,
    expectedIntersectionEmpty,
  );

  const array5 = ["a", "b", "c"];
  const array6 = ["b", "c", "d"];
  const expectedIntersectionStrings = ["b", "c"];
  const resultStrings = $intersection([array5, array6]);
  assertEquals(
    resultStrings,
    expectedIntersectionStrings,
  );

  const array7 = [true, false, true];
  const array8 = [false, true, false];
  const expectedIntersectionBooleans = [true, false, true];
  const resultBooleans = $intersection([array7, array8]);
  assertEquals(
    resultBooleans,
    expectedIntersectionBooleans,
  );

  const array9 = [1.1, 2.2, 3.3];
  const array10 = [2.2, 3.3, 4.4];
  const expectedIntersectionFloats = [2.2, 3.3];
  const resultFloats = $intersection([array9, array10]);
  assertEquals(
    resultFloats,
    expectedIntersectionFloats,
  );
});

Deno.test("$intersecion with invalid arguments", () => {
  const nonArrayOfArrays = [1, 2, 3];
  assertThrows(
    () => {
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      $intersection(nonArrayOfArrays);
    },
    Error,
    "expected each element to be an array",
  );
});

Deno.test("$union", () => {
  const array1 = [1, 2, 3];
  const array2 = [2, 3, 4];
  const expectedUnion = [1, 2, 3, 4];
  const result = $union(array1, array2);
  assertEquals(
    result,
    expectedUnion,
  );

  const array3: string[] = ["a", "b", "c"];
  const array4: string[] = ["b", "c", "d"];
  const expectedUnionStrings = ["a", "b", "c", "d"];
  const resultStrings = $union(array3, array4);
  assertEquals(
    resultStrings,
    expectedUnionStrings,
  );

  const array5 = [true, false, true];
  const array6 = [false, true, false];
  const expectedUnionBooleans = [true, false];
  const resultBooleans = $union(array5, array6);
  assertEquals(
    resultBooleans,
    expectedUnionBooleans,
  );

  const array7 = [1.1, 2.2, 3.3];
  const array8 = [2.2, 3.3, 4.4];
  const expectedUnionFloats = [1.1, 2.2, 3.3, 4.4];
  const resultFloats = $union(array7, array8);
  assertEquals(
    resultFloats,
    expectedUnionFloats,
  );

  const array9 = ["x", "y"];
  const array10 = ["y", "z"];
  const array11 = ["a", "b"];
  const expectedUnionMultiple = ["x", "y", "z", "a", "b"];
  const resultMultiple = $union(array9, array10, array11);
  assertEquals(
    resultMultiple,
    expectedUnionMultiple,
  );
});

Deno.test("$union with invalid arguments", () => {
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $union(null),
    "expected arrays as arguments",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $union(undefined),
    "expected arrays as arguments",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $union(123),
    "expected arrays as arguments",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $union("string"),
    "expected arrays as arguments",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    () => $union([1, 2, 3], null),
    "expected arrays as arguments",
  );
});
