const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = function (_env, argv) {
    console.log(argv);
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;

    return {
        devtool: isDevelopment && "cheap-module-source-map",
        entry: "./src/index.jsx",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "assets/js/[name].[contenthash:8].js",
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            envName: isProduction ? "production" : "development",
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader",
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx"],
        },
        plugins: [
            new webpack.DefinePlugin({
                //'process.env.NODE_ENV': JSON.stringify(options.prod ? 'production' : 'dev'),
                API_SERVER: JSON.stringify(
                    Array.isArray(argv.env.apiUrl) ? argv.env.apiUrl[1] : argv.env.apiUrl
                ),
            }),
            isProduction &&
                new MiniCssExtractPlugin({
                    filename: "assets/css/[name].[contenthash:8].css",
                    chunkFilename: "assets/css/[name].[contenthash:8].chunk.css",
                }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./index.html"),
                inject: true,
            }),
        ].filter(Boolean),
    };
};
