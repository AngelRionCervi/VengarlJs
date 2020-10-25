const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./test/index.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "js/bundle.js",
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
        new HtmlWebpackPlugin({      
          template: "./test/index.html" 
        })
      ]
};
