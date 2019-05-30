const update = require("../index.js")

const source = require("./source.js")

describe("$set", () => {
    it("top level", () => {
        const updated = update(
            source,
            {"top.$set": 5}
        )

        expect(updated)
            .toEqual({
                top: 5,
                nested: {
                    value: 1,
                    array: [4, 5, 6]
                },
                topArray: [1, 2, 3]
            })
    })
    it("top level - create", () => {
        const updated = update(
            source,
            {"topCreated.$set": 5},
            true
        )

        expect(updated)
            .toEqual({
                top: 10,
                topCreated: 5,
                nested: {
                    value: 1,
                    array: [4, 5, 6]
                },
                topArray: [1, 2, 3]
            })
    })

    it("nested", () => {
        const updated = update(
            source,
            {"nested.value.$set": 5}
        )

        expect(updated)
            .toEqual({
                top: 10,
                nested: {
                    value: 5,
                    array: [4, 5, 6]
                },
                topArray: [1, 2, 3]
            })
    })
    it("nested - created", () => {
        const updated = update(
            source,
            {"nestCreated.value.$set": 5},
            true
        )

        expect(updated)
            .toEqual({
                top: 10,
                nestCreated: {
                    value: 5
                },
                nested: {
                    value: 1,
                    array: [4, 5, 6]
                },
                topArray: [1, 2, 3]
            })
    })
})
