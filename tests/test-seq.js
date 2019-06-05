const update = require("../index.js")

describe("seq", () => {
    it("keeps order", () => {
        const updated = update.seq(
            {a: 1, b: 2},
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
