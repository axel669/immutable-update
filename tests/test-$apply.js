const update = require("../index.js")

const source = require("./source.js")

describe("$apply", () => {
    it("top level", () => {
        const updated = update(
            source,
            {$apply: Object.keys}
        )

        expect(updated.sort())
            .toEqual(["nested", "top", "topArray"])
        expect(source === updated)
            .toBe(false)
    })
    it("first level", () => {
        const updated = update(
            source,
            {"top.$apply": i => i ** 2}
        )

        expect(updated)
            .toEqual({
                ...source,
                top: 100
            })
        expect(source === updated)
            .toBe(false)
    })
    it("nested", () => {
        const updated = update(
            source,
            {"nested.value.$apply": i => i + 3}
        )

        expect(updated)
            .toEqual({
                top: 10,
                nested: {
                    value: 4,
                    array: [4, 5, 6]
                },
                topArray: [1, 2, 3]
            })
        expect(source === updated)
            .toBe(false)
    })
})
