var baseWebpackConfig = require('./webpack.base.js');
var merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    splitChunks: {
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      minChunks: 1,
      cacheGroups: {
        default: false,
        commons: {
          filename: './commons/[name].[hash:8].js',
          name: "commons",
          chunks: "initial",
          minChunks: 2
        },
        vendor: {
          test: /node_modules/,
          filename: './vendor/[name].[hash:8].js',
          name: "vendor",
          chunks: "initial",
          minChunks: 1,
          priority: 10
        },
        jq: {
          test: /\.js$/,
          filename: './vendor/[name].[hash:8].js',
          name: "jq",
          chunks: "initial",
          enforce: true,
        }
        /* styles: {
          name: 'styles',
          //filename: './css/[name].[hash:8].js',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        } */
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('producton')
    })
  ]
})