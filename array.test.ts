import { $groupBy, $unique } from "./array.ts";
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
