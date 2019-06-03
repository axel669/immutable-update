const update = require("../index.js")

const source = require("./source.js")

describe("$set", () => {
    describe("top level", () => {
        it("update", () => {
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
        it("update array", () => {
            const updated = update(
                source,
                {"topArray.2.$set": 5}
            )

            expect(updated)
                .toEqual({
                    top: 10,
                    nested: {
                        value: 1,
                        array: [4, 5, 6]
                    },
                    topArray: [1, 2, 5]
                })
        })
        it("create", () => {
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
    })

    describe("nested", () => {
        it("update", () => {
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
        it("update array", () => {
            const updated = update(
                source,
                {"nested.array.1.$set": 2}
            )

            expect(updated)
                .toEqual({
                    top: 10,
                    nested: {
                        value: 1,
                        array: [4, 2, 6]
                    },
                    topArray: [1, 2, 3]
                })
        })
        it("create", () => {
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
})
