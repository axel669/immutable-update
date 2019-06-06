import {terser} from "rollup-plugin-terser"

export default {
    input: "src/update.js",
    output: [
        {
            format: "cjs",
            file: "min/index.js"
        },
        {
            format: "iife",
            name: "immutableUpdate",
            file: "standalone/update.min.js"
        },
        {
            format: "es",
            file: "esm/min/index.js"
        }
    ],
    plugins: [
        terser()
    ]
}
