const path = require("path");
const NpmDtsPlugin = require('npm-dts-webpack-plugin');

module.exports = {
    mode: "production",
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "js/index.js",
        library: "vengarl",
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new NpmDtsPlugin({output: "build/types/index.d.ts"}),
    ],
};
