const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || 3000;

let isProduction = process.env.NODE_ENV === "production";
const mode = isProduction ? "production" : "development";
const devtool = isProduction ? "source-map" : "inline-source-map";

module.exports = {
  mode,
  entry: "./src/app/index.bs.js",
  devtool: devtool,
  devServer: {
    contentBase: "./dist",
    port,
  },
  plugins: [new HtmlWebpackPlugin({ template: "templates/index.html" })],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
