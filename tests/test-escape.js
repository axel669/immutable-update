const update = require("../index.js")

const source = {
    "top.test": 1,
    nested: {
        "value.thing": "wat"
    },
    "nested.dots": {
        array: [],
        "wat.woah": 3.14
    }
}

describe("escaped", () => {
    it("top level", () => {
        const updated = update(
            source,
            {"top..test.$set": 100}
        )

        expect(updated)
            .toEqual({
                ...source,
                "top.test": 100
            })
    })

    it("nested", () => {
        const updated = update(
            source,
            {
                "nested.value..thing.$set": "not wat",
                "nested..dots.array.$push": 0,
                "nested..dots.wat..woah.$apply": i => i * 2
            }
        )

        expect(updated)
            .toEqual({
                "top.test": 1,
                nested: {
                    "value.thing": "not wat"
                },
                "nested.dots": {
                    array: [0],
                    "wat.woah": 6.28
                }
            })
    })

    it("$unset", () => {
        const updated = update(
            source,
            {$unset: ["top.test"]}
        )

        expect(updated)
            .toEqual({
                nested: {
                    "value.thing": "wat"
                },
                "nested.dots": {
                    array: [],
                    "wat.woah": 3.14
                }
            })
    })
})
