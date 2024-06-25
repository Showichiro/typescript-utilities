import { assertEquals } from "jsr:@std/assert@^0.226.0/assert-equals";
import { $memorize } from "./function.ts";
import { assertThrows } from "jsr:@std/assert@^0.226.0/assert-throws";

Deno.test("$memorize", () => {
  let count = 0;
  const add = $memorize((a: number, b: number) => {
    count++;
    return a + b;
  }, (a, b) => `${a}-${b}`);

  assertEquals(add(1, 2), 3);
  assertEquals(count, 1);
  assertEquals(add(1, 3), 4);
  assertEquals(count, 2);
  assertEquals(add(1, 2), 3);
  assertEquals(count, 2);
});

Deno.test("$memorize with invalid arguments", () => {
  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $memorize("1234", 1234),
    "expected a function for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $memorize(true, false),
    "expected a function for a first argument",
  );

  assertThrows(
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    () => $memorize(() => {}, "not a function"),
    "expected a function for a second argument",
  );
});
