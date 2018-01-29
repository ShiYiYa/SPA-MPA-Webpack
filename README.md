# Preview
~~使用webpack开发SPA（react）项目~~  
请使用[官方脚手架](https://github.com/facebook/create-react-app)**很强大**  
使用webpack开发多页面MPA，单页面项目SPA。
单：webpack.dev.js webpack.prod.js
多：webpack.react.dev.js webpack.react.prod.js

## 项目结构
```
|-build    //打包目录
|--assets  //资源目录
|--common  //多次使用的文件&第三方依赖
|--css
|--js
|--css
|-index.html
|-home.html
|-src        //生产环境
|--js
|--css
|--img
|--templates  //多页面模板
|-...
|-...        //配置文件
```

## 使用方法
```yarn install``` or ```npm install```  
会自动下载React开发和生产所需要的依赖包。  
```yarn build``` or ```npm build```  
打包文件，即最终产品。打包后目录为build文件夹。  
```yarn serve```  
运行,打开浏览器localhost:5000将看到最终效果

## 包含
react：应该官方脚手架有的功能都差不多，只是有很多不同(奇怪)之处。XD
```
--- sass-loader 
--- post-css css预处理 
--- HtmlWebpackPlugin 
--- ExtractTextPlugin 分离css
--- UglifyJSPlugin 代码压缩
--- CleanWebpackPlugin
--- SourceMap
--- CommonsChunkPlugin 代码拆分
--- HotModuleReplacementPlugin 热替换
```