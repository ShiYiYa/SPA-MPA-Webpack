const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require("./paths");

module.exports = {
  entry: paths.appEntry,
  output: {
    path: paths.appBuild,
    filename: paths.jsFilename,
    chunkFilename: paths.chunkFilename,
    publicPath:
      process.env.NODE_ENV === "production"
        ? paths.servedPath
        : paths.publicPath
  },
  resolve: {
    extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"],
    alias: {}
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: paths.cssFilename
      //chunkFilename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: path.resolve(__dirname, "../ postcss.config")
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: "1024",
              name: "[name].[hash:8].[ext]",
              outputPath: "./static/"
            }
          }
        ]
      }
    ]
  }
};
