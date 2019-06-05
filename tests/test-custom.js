const update = require("../index.js")

const source = require("./source.js")

update.actions.$pow = (n, power) => n ** power
describe("custom", () => {
    it("top level", () => {
        const updated = update(
            source,
            {"top.$pow": 2}
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
            {"nested.array.1.$pow": 3}
        )

        expect(updated)
            .toEqual({
                top: 10,
                nested: {
                    value: 1,
                    array: [4, 125, 6]
                },
                topArray: [1, 2, 3]
            })
        expect(source === updated)
            .toBe(false)
    })
})
