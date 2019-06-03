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
    })

    it("nested", () => {
    })
})
