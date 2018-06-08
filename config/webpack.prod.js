const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.js");
const paths = require("./paths");

const shouldUseSourceMap = true;
const minify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
};

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  devtool: shouldUseSourceMap ? "source-map" : false,
  optimization: {
    minimize: true,
    splitChunks: {
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      minChunks: 1,
      cacheGroups: {
        default: false,
        commons: {
          //filename: "./commons/[name].[hash:8].js",
          name: "commons",
          chunks: "initial",
          minChunks: 2
        },
        vendor: {
          test: /node_modules/,
          filename: "vendor/[name].[hash:8].js",
          name: "vendor",
          chunks: "initial",
          minChunks: 1,
          priority: 10
        },
        jq: {
          test: /\.js$/,
          filename: "lib/[name].[hash:8].js",
          name: "jq",
          chunks: "initial",
          enforce: true
        }
        /* styles: {
          name: 'styles',
          //filename: 'css/[name].[hash:8].js',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        } */
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(paths.appBuild, {
      root: paths.appRoot
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      path: paths.appBuild,
      filename: "index.html",
      title: "初探 wepack4!!",
      template: paths.appHtml,
      chunks: ["vendor", "app", "jq"],
      minify: minify
    }),
    new HtmlWebpackPlugin({
      inject: true,
      path: paths.appBuild,
      filename: "about.html",
      title: "about",
      template: paths.appHtml,
      chunks: ["about", "jq"],
      minify: minify
    })
  ]
});
console.log(process.env.NODE_ENV, (config, { dev }) => {
  console.log();
});
