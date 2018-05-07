const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    //vendor: ['react'],
    app: path.resolve(__dirname, './src/index.js'),
    jq: path.resolve(__dirname, './src/jq.js') //假装是 jq，将 jq 单独打包而不是在一个 vendor 内
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: './js/[name].[hash:8].js',
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: [".js", ".css", ".json"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      path: __dirname + '/dist',
      title: '初探 wepack4!!',
      template: './index.html',
      chunks: ['vendor', 'app', 'jq'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].[hash:8].css",
      //chunkFilename: "[name].css"
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //因为上面设置了 /css/ 目录 
              //Issue：https://github.com/webpack-contrib/mini-css-extract-plugin/issues/44#issuecomment-379059788
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            }
          },
          { loader: 'postcss-loader' },
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '1024',
              name: '[name].[hash:8].[ext]',
              outputPath: './static/',
              //publicPath: './static/'//图片在 css/js 的上层目录，即根目录下 */
            }
          }
        ]
      }
    ]
  }
}