const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

var baseWebpackConfig = require("./webpack.base.js");
module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, "dist"),
    host: "localhost",
    port: 1215,
    compress: true
  }
});
