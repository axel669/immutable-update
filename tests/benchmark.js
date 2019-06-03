const {performance} = require("perf_hooks")

const update = require("../index.js")

const source = {a: 10, b: 12, c: 14}
const updates = {
    "a.$set": 100,
    "b.$set": [1, 2],
    "d..e.$set": "LUL"
}

const lim = 10000n
const name = `update x ${lim}`

const repeat = (count, action) => {
    for (let current = 0n; current < count; current += 1n) {
        action()
    }
}

repeat(
    30n,
    () => {
        console.time(name)
        repeat(
            lim,
            () => update(source, updates, true)
        )
        console.timeEnd(name)
    }
)
