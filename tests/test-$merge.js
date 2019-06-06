const update = require("../index.js")

const source = require("./source.js")

describe("$merge", () => {
    it("top level", () => {
        const updated = update(
            source,
            {"$merge": {a: 10}}
        )

        expect(updated)
            .toEqual({
                ...source,
                a: 10
            })
        expect(source === updated)
            .toBe(false)
    })

    it("nested", () => {
        const updated = update(
            source,
            {"nested.$merge": {hi: "there"}}
        )

        expect(updated)
            .toEqual({
                top: 10,
                nested: {
                    value: 1,
                    array: [4, 5, 6],
                    hi: "there"
                },
                topArray: [1, 2, 3]
            })
        expect(source.topArray === updated.topArray)
            .toBe(true)
        expect(source === updated)
            .toBe(false)
    })
})
