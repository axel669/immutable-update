const update = require("../index.js")

const source = require("./source.js")
const arraySource = [10, 9, 8, 7]

describe("$append", () => {
    it("on array", () => {
        const updated = update(
            arraySource,
            {$append: [6]}
        )

        expect(updated)
            .toEqual([10, 9, 8, 7, 6])
    })

    it("top level", () => {
        const updated = update(
            source,
            {"topArray.$append": [5]}
        )

        expect(updated)
            .toEqual({
                ...source,
                topArray: [1, 2, 3, 5]
            })
    })
    it("nested", () => {
        const updated = update(
            source,
            {"nested.array.$append": [7]}
        )

        expect(updated)
            .toEqual({
                top: 10,
                nested: {
                    value: 1,
                    array: [4, 5, 6, 7]
                },
                topArray: [1, 2, 3]
            })
    })
})
