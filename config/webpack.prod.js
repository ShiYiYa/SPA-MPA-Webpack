const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.js");
const paths = require("./paths");

const shouldUseSourceMap = true;

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  devtool: shouldUseSourceMap ? "source-map" : false,
  optimization: {
    minimize: true,
    splitChunks: {
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        default: false,
        commons: {
          filename: "commons/[name].[hash:8].js",
          name: "commons",
          chunks: "initial",
          minChunks: 2,
          enforce: true
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: "vendor/[name].[hash:8].js",
          name: "vendor",
          chunks: "all",
          minChunks: 1,
          priority: 10,
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
    ...paths.entryAppHtml.map(i => new HtmlWebpackPlugin(i))
  ]
});
/* console.log(process.env.NODE_ENV, (config, { dev }) => {
  console.log();
}); */
