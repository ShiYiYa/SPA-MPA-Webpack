# react-webpack
使用webpack开发react项目

## 使用方法
```yarn install``` or ```npm install```  
会自动下载React开发和生产所需要的依赖包。  
```yarn build``` or ```npm build```
打包文件，即最终产品。打包后目录为build文件夹。

## 包含
```
- Common
--- style-loader
--- css-loader
--- sass-loader
--- file-loader
--- url-loader
--- babel
--- react react-dom
- webpack 生产环境
--- HtmlWebpackPlugin
--- ExtractTextPlugin
--- UglifyJSPlugin
--- CleanWebpackPlugin
--- SourceMap
- webpack-dev-server 开发环境
--- HotModuleReplacementPlugin 热替换
--- SourceMap
```