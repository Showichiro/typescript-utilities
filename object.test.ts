import { assertEquals } from "@std/assert/assert-equals";
import { assertThrows } from "@std/assert/assert-throws";
import { $deepMerge, $omit, $pick } from "./object.ts";

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

Deno.test("$deepMerge", () => {
  // 基本的なオブジェクトのマージ
  const obj1 = { a: 1, b: 2 };
  const obj2 = { b: 3, c: 4 };
  const merged1 = $deepMerge(obj1, obj2);
  assertEquals(merged1, { a: 1, b: 3, c: 4 });

  // ネストされたオブジェクトのマージ
  const nested1 = { a: 1, b: { c: 2, d: 3 } };
  const nested2 = { b: { d: 4, e: 5 }, f: 6 };
  const mergedNested = $deepMerge(nested1, nested2);
  assertEquals(mergedNested, { a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 });

  // 配列のマージ
  const withArray1 = { a: 1, b: [1, 2, 3] };
  const withArray2 = { b: [4, 5], c: 3 };
  const mergedArray = $deepMerge(withArray1, withArray2);
  assertEquals(mergedArray, { a: 1, b: [1, 2, 3, 4, 5], c: 3 });

  // ネストされた複雑なオブジェクトのマージ
  const complex1 = { a: 1, b: { c: 2, d: { e: 3, f: 4 } } };
  const complex2 = { b: { d: { f: 5, g: 6 }, h: 7 } };
  const mergedComplex = $deepMerge(complex1, complex2);
  assertEquals(mergedComplex, {
    a: 1,
    b: { c: 2, d: { e: 3, f: 5, g: 6 }, h: 7 },
  });

  // 配列を含むネストされたオブジェクトのマージ
  const arrayNested1 = { a: { b: [1, 2], c: 3 } };
  const arrayNested2 = { a: { b: [4, 5], d: 6 } };
  const mergedArrayNested = $deepMerge(arrayNested1, arrayNested2);
  assertEquals(mergedArrayNested, { a: { b: [1, 2, 4, 5], c: 3, d: 6 } });
});

Deno.test("$deepMerge with invalid arguments", () => {
  // 非オブジェクト引数に対するエラーハンドリング
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $deepMerge("not an object", {}),
    "expected a non-null object for the first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $deepMerge({}, "not an object"),
    "expected a non-null object for the second argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $deepMerge(null, {}),
    "expected a non-null object for the first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $deepMerge({}, null),
    "expected a non-null object for the second argument",
  );
});
