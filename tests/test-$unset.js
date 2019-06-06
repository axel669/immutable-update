const update = require("../index.js")

const source = require("./source.js")

describe("$unset", () => {
    describe("top level", () => {
        it("single prop", () => {
            const updated = update(
                source,
                {"$unset": ["top"]}
            )

            expect(updated)
                .toEqual({
                    nested: {
                        value: 1,
                        array: [4, 5, 6]
                    },
                    topArray: [1, 2, 3]
                })
            expect(source === updated)
                .toBe(false)
        })

        it("multiple props", () => {
            const updated = update(
                source,
                {"$unset": ["top", "nested"]}
            )

            expect(updated)
                .toEqual({
                    topArray: [1, 2, 3]
                })
            expect(source === updated)
                .toBe(false)
        })
    })

    describe("nested", () => {
        it("single prop", () => {
            const updated = update(
                source,
                {"nested.$unset": ["value"]}
            )

            expect(updated)
                .toEqual({
                    top: 10,
                    nested: {
                        array: [4, 5, 6]
                    },
                    topArray: [1, 2, 3]
                })
            expect(source === updated)
                .toBe(false)
        })

        it("multiple props", () => {
            const updated = update(
                source,
                {"nested.$unset": ["value", "array"]}
            )

            expect(updated)
                .toEqual({
                    top: 10,
                    nested: {},
                    topArray: [1, 2, 3]
                })
            expect(source === updated)
                .toBe(false)
        })
    })
})
