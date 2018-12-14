const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.js')
const paths = require('./paths')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: paths.shouldUseSourceMap ? 'source-map' : false,
  optimization: {
    minimize: true,
    splitChunks: {
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        default: false,
        commons: {
          chunks: 'initial',
          filename: 'commons/[name].[contenthash:8].js',
          name: 'commons',
          minChunks: 2,
          enforce: true
        },
        vendor: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          filename: 'vendor/[name].[contenthash:8].js',
          name: 'vendor',
          minChunks: 1,
          priority: 10,
          enforce: true
        }
        /* styles: {
          name: 'styles',
          //filename: 'css/[name].[contenthash:8].js',
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
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    ...paths.entryAppHtml.map(i => new HtmlWebpackPlugin(i)),
    new BundleAnalyzerPlugin()
  ]
})
/* console.log(process.env.NODE_ENV, (config, { dev }) => {
  console.log();
}); */
