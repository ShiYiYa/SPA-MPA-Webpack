# react-webpack
~~使用webpack开发react项目~~  
请使用[官方脚手架](https://github.com/facebook/create-react-app)，除非你和我一样为了**熟悉webpack**
对于普通多页面应用，可以一试~~ :D

## 使用方法
```yarn install``` or ```npm install```  
会自动下载React开发和生产所需要的依赖包。  
```yarn build``` or ```npm build```
打包文件，即最终产品。打包后目录为build文件夹。
```yarn serve```  
运行

## 包含
```
应该官方脚手架有的功能都差不多，只是有很多不同(奇怪)之处。XD
- Common
--- post-css css预处理，加上私有前缀
--- style-loader
--- css-loader
--- sass-loader
--- file-loader
--- url-loader
--- babel
--- react / react-dom
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