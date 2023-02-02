// import benchmark from "benchmark"

import update from "../update.mjs"
import current from "../index.js"
// import fb from "immutability-helper"

// const suite = new benchmark.Suite()

const source = {
    a: 10,
    b: 12,
    c: [1, 2, 3, 4]
}

const lim = 100000

for (let i = 0; i < lim / 10; i += 1) {
    current(
        source,
        {
            "a.$set": 100,
            "b.$set": [1, 2],
            "d..e.$set": "LUL"
        }
    )
    update(
        source,
        {
            ".a.set": 100,
            ".b.set": [1, 2],
            ".d[.e].set": "LUL"
        }
    )
}

console.time("new")
for (let i = 0; i < lim; i += 1) {
    update(
        source,
        {
            ".a.set": 100,
            ".b.set": [1, 2],
            ".d[.e].set": "LUL"
        }
    )
}
console.timeEnd("new")
console.time("current")
for (let i = 0; i < lim ; i += 1) {
    current(
        source,
        {
            "a.$set": 100,
            "b.$set": [1, 2],
            "d..e.$set": "LUL"
        }
    )
}
console.timeEnd("current")

// suite.add(
//     "update",
//     () =>
//         update(source)
//         `c.$push${10}`
//         .value()
// )
// suite.add(
//     "current update",
//     () => current(
//         source,
//         { "c.$push": 10 }
//     )
// )
// suite.add(
//     "facebook",
//     () => fb(
//         source,
//         { c: { $push: [10] } }
//     )
// )

// suite.on(
//     "cycle",
//     (evt) => console.log(
//         String(evt.target)
//     )
// )

// suite.run()
