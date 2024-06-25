import { assertEquals } from "@std/assert/assert-equals";
import { assertThrows } from "@std/assert/assert-throws";
import { $omit, $pick } from "./object.ts";

Deno.test("$pick", () => {
  const obj = { a: "1", b: 2 };
  const test1 = $pick(obj, []);
  assertEquals(test1, {});
  const test2 = $pick(obj, ["a"]);
  assertEquals(test2, { a: "1" });
  const test3 = $pick(obj, ["a", "b"]);
  assertEquals(test3, obj);
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  const test4 = $pick(obj, ["a", "b", "c"]);
  assertEquals(test4, obj);
  const test5 = $pick({}, []);
  assertEquals(test5, {});
  const obj2 = { 1: "a", 2: "b", 3: [] };
  const test6 = $pick(obj2, [1, 2]);
  assertEquals(test6, {
    1: "a",
    2: "b",
  });
});

Deno.test("$pick with invalid arguments", () => {
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $pick("1234", []),
    "expected a non-null object for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $pick(1234, []),
    "expected a non-null object for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $pick(true, []),
    "expected a non-null object for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $pick(null, []),
    "expected a non-null object for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $pick(undefined, []),
    "expected a non-null object for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $pick({}, "1234"),
    "expected an array for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $pick({}, 1234),
    "expected an array for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $pick({}, true),
    "expected an array for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $pick({}, null),
    "expected an array for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $pick({}, undefined),
    "expected an array for a second argument",
  );
});

Deno.test("$omit", () => {
  const obj = { a: "1", b: 2 };
  const test1 = $omit(obj, []);
  assertEquals(test1, obj);
  const test2 = $omit(obj, ["a"]);
  assertEquals(test2, { b: 2 });
  const test3 = $omit(obj, ["a", "b"]);
  assertEquals(test3, {});
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  const test4 = $omit(obj, ["a", "b", "c"]);
  assertEquals(test4, {});
  const test5 = $omit({}, []);
  assertEquals(test5, {});
  const obj2 = { 1: "a", 2: "b", 3: [] };
  const test6 = $omit(obj2, [1, 2]);
  assertEquals(test6, {
    3: [],
  });
});

Deno.test("$omit with invalid arguments", () => {
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $omit("1234", []),
    "expected a non-null object for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $omit(1234, []),
    "expected a non-null object for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $omit(true, []),
    "expected a non-null object for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $omit(null, []),
    "expected a non-null object for a first argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $omit(undefined, []),
    "expected a non-null object for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $omit({}, "1234"),
    "expected an array for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $omit({}, 1234),
    "expected an array for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $omit({}, true),
    "expected an array for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $omit({}, null),
    "expected an array for a second argument",
  );
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $omit({}, undefined),
    "expected an array for a second argument",
  );
});
