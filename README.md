# Immutable Update

A small library for updating POJOs in a functional style without modifying
source objects.

## Installation
`npm i @axel669/immutable-update`

## Motiviation
The original motivation for this project was efficient updates of React
component state. I wanted a library that gave me the referential safety of
Immutable.js but allowed me to work with normal JS objects as well. The React
immutability helper library was a good start, but the number of closing brackets
on deep updates was ugly, so I started work on this.

This:
```js
import update from 'immutability-helper';

const newData = update(myData, {
    x: {y: {z: {$set: 7}}},
    a: {b: {$push: [9]}}
});
```

Becomes this:
```js
import update from "@axel669/immutable-update"

const newData = update(
    myData,
    {
        "x.y.z.$set": 7,
        "a.b.$push": 9
    }
)
```

## API

### `update(source, updates[, create = false])`

Updates the source object with the changes specified in `updates`. The `updates`
argument is an object whose keys are the change to be made, and the values are
givne to the update function `{change: value}`.

If `create` is true and a property does not exist in the path given, the
property will be created.

```js
const source = {a: 0, b: [1, 2, 3]}
const changed = update(
    source,
    {"a.$set": 4}
)

console.log(source)                 // {a: 0, b: [1, 2, 3]}
console.log(changed)                // {a: 4, b: [1, 2, 3]}
console.log(source === changed)     // false
console.log(source.b === changed.b) // true
```

`create === true`
```js
const source = {}
const changed = update(
    source,
    {"a.b.c.$set": 0},
    true
)

console.log(changed) // {a: {b: {c: 0}}}
```

`update()` will not change references of objects it does not change.

#### `change`
The `change` referred to in this API is a string representing the object path
to update, and the action to apply at that path. For arrays, write the index as
if it were a normal prop, the library is smart enough to treat it correctly.

##### Examples
- `a.b.$set`
- `items.0.name.$apply`

##### Actions
1. `$append` - Appends one array to another
    - `{"ids.$append": [101, 200, 202, 203]}`
1. `$apply` - Calls a function supplying the current value as an argument and
    using the return value as the new value
    - `{"value.$apply": i => i ** 2}`
1. `filter` - Filters an array
    - `{"names.$filter": name => name.length < 10}`
1. `$merge` - Merges to objects
    - `{"serverInfo.$merge": {port: 1337}}`
1. `$push` - Pushes a single value to the end of an array
    - `{"fruits.$push": "tomato"}`
1. `$set` - Sets a property to the given value
    - `{"name.$set": "World"}`
1. `$unset` - Removes properties from an object
    - `{"item.$unset": ["weight", "price"]}`

Custom actions can be defined by adding to `update.actions`
```js
udpate.actions.$pow = (value, power) => value ** power

const changed = update({a: 2}, {"a.$pow": 3})

console.log(changed) // {a: 8}
```


**Note: The order of updates is not guaranteed because of how JS stores
objects. If you need changes that are executed in a specific sequence, use
`update.seq()`**

### `update.seq(source, ...updates)`

Applies a sequence of changes to a source object, maintaining the order given
for the updates. Instead of using an object for the updates, they are given as
arguments in the form of `[change, value] ex: ["a.$set", 4]`

```js
const source = {a: 0, b: [1, 2, 3]}
const changed = update.seq(
    source,
    ["a.$set", 4],
    ["a.$apply", i => i ** 2]
)

console.log(changed)                // {a: 16, b: [1, 2, 3]}
```

### `update.expand(...sources)`

Takes a list of source objects and applies changes to a fresh object (`{}`) as
if every property in each source had `$set` appended to the end. Useful for
defining config files.

```js
//  config.js
modue.exports = {
    "server.port": 1337,
    "server.displayName": "L33t Server",
    "maxPlayers": 10
}

//  config.dev.js
module.exports = {
    "server.displayName": "Dev L33t Server"
}

//  main.js
const config = update.expand(
    require("./config.js"),
    require("./config.dev.js")
)

console.log(config)
// {
//     server: {
//         port: 1337,
//         displayName: "Dev L33t Server"
//     },
//     maxPlayers: 10
// }
```
