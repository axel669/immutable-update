import tea from "@axel669/teascript/rollup";

export default {
    input: "src/update.tea",
    output: [
        {
            format: "cjs",
            file: "index.js"
        },
        {
            format: "iife",
            name: "immutableUpdate",
            file: "standalone/update.js"
        },
        {
            format: "es",
            file: "es6/index.js"
        }
    ],
    plugins: [
        tea({
            include: "src/**.tea"
        })
    ]
};
