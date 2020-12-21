const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NpmDtsPlugin = require('npm-dts-webpack-plugin');

module.exports = {
    mode: "production",
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "js/Vengarl.js",
        library: "vengarl",
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
    devServer: {
        port: 8088,
        contentBase: path.join(__dirname, "test"),
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
        new NpmDtsPlugin({output: "Vengarl.d.ts"}),
        new HtmlWebpackPlugin({
            template: "./test/index.html",
        }),
    ],
};
