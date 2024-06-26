# utilities

[![codecov](https://codecov.io/gh/Showichiro/typescript-utilities/graph/badge.svg?token=7AYSBYJCF0)](https://codecov.io/gh/Showichiro/typescript-utilities)
[![JSR](https://jsr.io/badges/@showichiro/utilities)](https://jsr.io/@showichiro/utilities)

In this repository, we provide utility functions related to functions, objects,
,arrays and types. These functions are written in TypeScript and designed to
maintain type safety.

## functions

```ts
import { $memorize } from "@uchihori/utilities/function";

function expensiveOperation(x: number, y: number): number {
  // Some heavy computation...
  return x + y;
}

const memoizedExpensiveOperation = $memorize(
  expensiveOperation,
  (x, y) => `${x}-${y}`,
);

console.log(memoizedExpensiveOperation(1, 2)); // Output: 3
console.log(memoizedExpensiveOperation(1, 2)); // Output: 3 (cached result)
```

## object

```ts
import { $omit, $pick } from "@uchihori/utilities/object";

type User = {
  id: number;
  name: string;
  email: string;
};

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
};

const picked = $pick(user, ["email"]); // picked = {email: "john.doe@example.com"}
console.log(picked.email); // Output: john.doe@example.com
```

```ts
import { $omit } from "@uchihori/utilities/object";

const user = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
};

const omitted = $omit(user, ["email"]); // omitted = { id: 1, name: 'John Doe' }
console.log(omitted.email); // Output: undefined
```

## array

```ts
import { $unique } from "@uchihori/utilities/array";

const numbers = [1, 2, 3, 2, 1];
const uniqueNumbers = $unique(numbers);
console.log(uniqueNumbers); // Output: [1, 2, 3]
```

unique by customized key

```ts
import { $unique } from "@uchihori/utilities/array";

type Person = {
  name: string;
  age: number;
};

const people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 25 },
  { name: "Alice", age: 30 }, // Alice is duplicated
  { name: "David", age: 35 },
];

// Custom comparator function evaluating uniqueness by the combination of name and age
const uniquePeople = $unique(
  people,
  (person) => `${person.name}-${person.age}`,
);

console.log(uniquePeople);
// Output: [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 25 }, { name: "David", age: 35 }]
```

```ts
import { $groupBy } from "@uchihori/utilities/array";

const users = [
  { id: 1, city: "Tokyo" },
  { id: 2, city: "Osaka" },
  { id: 3, city: "Tokyo" },
];

const groupedByCity = $groupBy(users, (user) => user.city);

console.log(groupedByCity);
// Output: { Tokyo: [{ id: 1, city: 'Tokyo' }, { id: 3, city: 'Tokyo' }], Osaka: [{ id: 2, city: 'Osaka' }] }
```

```ts
import { $drop } from "@uchihori/utilities/array";

const numbers = [1, 2, 3, 4, 5];
const droppedNumbers = $drop(numbers, 1);
console.log(droppedNumbers); // Output: [2, 3, 4, 5]
```

```ts
import { $dropRight } from "@uchihori/utilities/array";

const numbers = [1, 2, 3, 4, 5];
const droppedFromEnd = $dropRight(numbers, 1);

console.log(droppedFromEnd); // Output: [1, 2, 3, 4]
```

```ts
import { $chunk } from "@uchihori/utilities/array";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const chunkedNumbers = $chunk(numbers, 3);
console.log(chunkedNumbers); // Output: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

```ts
import { $nonNull } from "@uchihori/utilities/array";

const arrayWithNulls = [1, undefined, 2, null, 3];
const nonNullArray = $nonNull(arrayWithNulls);
console.log(nonNullArray); // Output: [1, 2, 3]
```

```ts
import { $concat } from "@uchihori/utilities/array";

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const concatenatedArray = $concat(array1, array2);
console.log(concatenatedArray); // Output: [1, 2, 3, 4, 5, 6]
```

```ts
import { $reverse } from "@uchihori/utilities/array";

const numbers = [1, 2, 3, 4, 5];
const reversedNumbers = $reverse(numbers);
console.log(reversedNumbers); // Output: [5, 4, 3, 2, 1]
```

```ts
import { $fill } from "@uchihori/utilities/array";

const filledArray = $fill("x", 5);
console.log(filledArray); // Output: ['x', 'x', 'x', 'x', 'x']
```

```ts
import { $fromPairs } from "@uchihori/utilities/array";

const pairs = [["a", 1], ["b", 2], ["c", 3]];
const obj = $fromPairs(pairs);
console.log(obj); // Output: { a: 1, b: 2, c: 3 }
```

```ts
import { $removeItems } from "@uchihori/utilities/array";

const numbers = [1, 2, 3, 4, 5];
const filteredNumbers = $removeItems(numbers, 2, 4);
console.log(filteredNumbers); // Output: [1, 3, 5]

const mixedArray = [1, "2", "3", "4", "5"];
const filteredMixed = $removeItems(mixedArray, "2", "4");
console.log(filteredMixed); // Output: [1, "3", "5"]

const tupleArray = [1, 2, 3] as const;
const filteredTuple = $removeItems(tupleArray, 2);
console.log(filteredTuple); // Output: [1, 3] with type

const stringArray = ["1", "2", "3", "4", "5"];
const filteredString = $removeItems(stringArray, "2", "4");
console.log(filteredString); // Output: ["1", "3", "5"]
```

```ts
import { $intersection } from "@uchihori/utilities/array";

const array1 = [1, 2, 3];
const array2 = [2, 3, 4];
const intersectionResult = $intersection([array1, array2]);
console.log(intersectionResult); // Output: [2, 3]

const array3: string[] = ["a", "b", "c"];
const array4: string[] = ["b", "c", "d"];
const intersectionStrings = $intersection([array3, array4]);
console.log(intersectionStrings); // Output: ["b", "c"]

const array5 = [true, false, true];
const array6 = [false, true, false];
const intersectionBooleans = $intersection([array5, array6]);
console.log(intersectionBooleans); // Output: [false, true]

const array7 = [1.1, 2.2, 3.3];
const array8 = [2.2, 3.3, 4.4];
const intersectionFloats = $intersection([array7, array8]);
console.log(intersectionFloats); // Output: [2.2, 3.3]
```

```ts
import { $union } from "@uchihori/utilities/array";
const array1 = [1, 2, 3];
const array2 = [2, 3, 4];
const unionResult = $union(array1, array2);
console.log(unionResult); // Output: [1, 2, 3, 4]

const array3: string[] = ["a", "b", "c"];
const array4: string[] = ["b", "c", "d"];
const unionStrings = $union(array3, array4);
console.log(unionStrings); // Output: ["a", "b", "c", "d"]

const array5 = [true, false, true];
const array6 = [false, true, false];
const unionBooleans = $union(array5, array6);
console.log(unionBooleans); // Output: [true, false]

const array7 = [1.1, 2.2, 3.3];
const array8 = [2.2, 3.3, 4.4];
const unionFloats = $union(array7, array8);
console.log(unionFloats); // Output: [1.1, 2.2, 3.3, 4.4]
```

## types

```ts
import type { IsTuple } from "./types.ts";
type ExampleType = IsTuple<[1, 2, 3]>; // true
type AnotherExampleType = IsTuple<number[]>; // false
```

```ts
import type { RemoveNElements } from "./types.ts";
type DroppedTuple = RemoveNElements<[1, 2, 3, 4, 5], 2>; // [3, 4, 5]
```

```ts
import type { Slice } from "./types.ts";
type SlicedTuple = Slice<[1, 2, 3, 4, 5], 2>; // [3, 4, 5]
type SlicedArray = Slice<number[], 2>; // number[]
```

```ts
import type { Reverse } from "./types.ts";

type ReversedTuple = Reverse<[1, "two", true]>; // [true, 'two', 1]
type ReversedArray = Reverse<number[]>; // number[]
```

```ts
import type { RemoveNElementsRight } from "./types.ts";

type DroppedFromRight = RemoveNElementsRight<[1, "two", true, 42, "five"], 2>; // [1, 'two', true]
```

```ts
import type { SliceRight } from "./types.ts";

type SlicedFromRight = SliceRight<[1, "two", true, 42, "five"], 2>; // [1, 'two', true]
```

```ts
import type { FillArray } from "./types.ts";

// Generates a new array or tuple type with the specified length `N` and element type `E`. Returns an exact tuple type if the length is 10 or less, otherwise returns a general array type `E[]`.
type FilledTuple = FillArray<3, boolean>; // [boolean, boolean, boolean]
```

```ts
import type { Pair } from "./types.ts";

type ExamplePair = Pair<string, number>; // [string, number]
```

```ts
import type { FromPairs } from "./types.ts";

type ObjectFromPairs = FromPairs<[["a", 1], ["b", 2]]>; // { a: 1, b: 2 }
```
