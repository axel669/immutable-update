export default {
    input: "src/update.js",
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
            file: "esm/index.js"
        }
    ],
    plugins: [
    ]
};
