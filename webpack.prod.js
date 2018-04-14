var baseWebpackConfig = require('./webpack.base.js');
var merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig,{
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
        minChunks: 1
      },
      /* styles: {
        name: 'styles',
        //filename: './css/[name].[hash:8].js',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      } */
      //用这个需要加chunk,webpack5 后可能启用
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