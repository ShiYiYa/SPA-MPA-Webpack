/*
*
* React单页面配置
*/
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js',//业务代码 
    vendor: ['react', 'react-dom']//第三方库
  },
  output: {
    filename: './js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'source-map',
  plugins: [
    new ManifestPlugin(),//生成项目清单
    new webpack.HashedModuleIdsPlugin(),//避免common的hash更改而重新打包
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common','vendor'],
      filename: './common/[name].bundle.js',
      minChunks: 2,//多个页面引入该资源才被纳入公共文件。3~5
    }),
    new ExtractTextPlugin({//分离css
      filename: "./css/[name].[contenthash].css",
      disable: process.env.NODE_ENV === "development"
  }),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({//创建与js/css同步的index.html
      title: 'My React Main',
      template: './src/templates/index.html',
      filename: 'index.html',
      chunks: ['main','common','vendor']
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
            fallback: "style-loader",
            use: ['css-loader','postcss-loader']
        })
    },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 2 } },
            'postcss-loader',
             'sass-loader'
            ]
        })
      },
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
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        loader: [{loader: 'url-loader',options: {limit: 1024}}],
      }
    ]
  }
}