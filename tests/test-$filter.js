const update = require("../index.js")

const source = require("./source.js")
const arraySource = [10, 9, 8, 7]

describe("$filter", () => {
    it("on array", () => {
        const updated = update(
            arraySource,
            {$filter: i => (i % 2) === 0}
        )

        expect(updated)
            .toEqual([10, 8])
    })

    it("top level", () => {
        const updated = update(
            source,
            {"topArray.$filter": i => (i % 2) === 1}
        )

        expect(updated)
            .toEqual({
                ...source,
                topArray: [1, 3]
            })
    })
    it("nested", () => {
        const updated = update(
            source,
            {"nested.array.$filter": i => i < 6}
        )

        expect(updated)
            .toEqual({
                top: 10,
                nested: {
                    value: 1,
                    array: [4, 5]
                },
                topArray: [1, 2, 3]
            })
    })
})
