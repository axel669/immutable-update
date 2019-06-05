const update = require("../index.js")

const source = require("./source.js")

describe("$merge", () => {
    it("top level", () => {
        const updated = update(
            source,
            {"$merge": {a: 10}}
        )
    })
})
