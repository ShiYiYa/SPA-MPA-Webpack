const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require("./paths");

module.exports = {
  entry: paths.appEntrys,
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
    new HtmlWebpackPlugin({
      path: paths.appBuild,
      title: "app",
      filename: "index.html",
      template: paths.appHtml,
      chunks: ["vendor", "app", "jq"],
      hash: true,
      inject: true
    }),
    /* (function() {
      return new HtmlWebpackPlugin({
        path: paths.appBuild,
        title: "test",
        filename: "test.html",
        template: paths.appHtml,
        chunks: ["about", "jq"],
        hash: true,
        inject: true
      });
    })(), */
    new HtmlWebpackPlugin({
      path: paths.appBuild,
      title: "about",
      filename: "about.html",
      template: paths.appHtml,
      chunks: ["about", "jq"],
      hash: true,
      inject: true
    }),
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
          { loader: "postcss-loader" }
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
