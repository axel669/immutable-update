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
            file: "browser/update.js"
        }
    ],
    plugins: [
        tea({
            include: "src/**.tea"
        })
    ]
};
