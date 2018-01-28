const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'build'),
    //publicPath: '/'
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({//分离css
      filename: "./css/[name].[contenthash].css",
      disable: process.env.NODE_ENV === "development"
  }),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({//创建与js/css同步的index.html
      title: 'My App',
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new UglifyJSPlugin({//删除掉未被引用的 export
      sourceMap: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        })
      },
      /* {//适用于多，小图的情况下使用
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '/assets/[hash:8].[name].[ext]'
            }
          }
        ]
      }, */
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:8].[name].[ext]',
              outputPath: 'assets/',
              publicPath: '../'//图片在css/js的上层目录，即根目录下
            }  
          }
        ]
      }
    ]
  }
}