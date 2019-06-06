const update = require("../index.js")

describe("seq", () => {
    it("keeps order", () => {
        const source = {a: 1, b: 2}
        const updated = update.seq(
            source,
            ["a.$apply", a => a + 3],
            ["a.$apply", a => a / 2],
            ["b.$apply", b => b + 7],
            ["b.$apply", b => b / 3],
        )

        expect(updated)
            .toEqual({a: 2, b: 3})
        expect(source === updated)
            .toBe(false)
    })
})
