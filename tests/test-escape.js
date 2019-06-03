const update = require("../index.js")

const source = require("./source.js")

describe("escaped", () => {
    describe("$set", () => {
        it("top level", () => {
            const updated = update(
                source,
                {"top..test.$set": 100}
            )

            expect(updated)
                .toEqual({
                    "top.test": 100,
                    ...source
                })
        })
    })

    describe("$unset", () => {
    })
})
