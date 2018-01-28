const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['react-hot-loader/patch','./src/index.js'],
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//热替换
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/index.html'
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,//启用gzip 压缩
    port: 1215,
    hot: true,//热替换
    open: true
  },
  module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader'],
            },
            {
              test: /\.(css|scss)$/,
              exclude: /node_modules/,
                use: [
                  {
                    loader: 'style-loader'
                  },
                  {
                    loader: 'css-loader',
                    options: {
                      SourceMap: true
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      SourceMap: true
                    }
                  },
                ]
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
                    name: 'assets/[hash:8].[name].[ext]'
                  }  
                }
              ]
            }
          ]
        }
      };
 
