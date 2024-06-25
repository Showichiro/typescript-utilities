# utilities

[![codecov](https://codecov.io/gh/Showichiro/typescript-utilities/graph/badge.svg?token=7AYSBYJCF0)](https://codecov.io/gh/Showichiro/typescript-utilities)
[![JSR](https://jsr.io/badges/@showichiro/utilities)](https://jsr.io/@showichiro/utilities)

In this repository, we provide utility functions related to functions, objects,
and arrays. These functions are written in TypeScript and designed to maintain
type safety.

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

## array

```ts
import { $unique } from "@uchihori/utilities/array";

const numbers = [1, 2, 3, 2, 1];
const uniqueNumbers = $unique(numbers);
console.log(uniqueNumbers); // Output: [1, 2, 3]
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
