import tea from "@axel669/teascript/rollup";

export default {
    input: "src/update.tea",
    output: [
        {
            format: "cjs",
            file: "update.js"
        },
        {
            format: "iife",
            name: "immutableUpdate",
            file: "standalone/update.js"
        },
        {
            format: "es",
            file: "es6/update.js"
        }
    ],
    plugins: [
        tea({
            include: "src/**.tea"
        })
    ]
};
