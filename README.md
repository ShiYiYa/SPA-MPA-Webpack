# webpack4 升级手册
webpack4 更新了很久了，也更新了些许东西；默认 **0** 配置，CommonsChunkPlugin 等插件的废弃等等;  
可惜文档感觉不是很全，但该升级还是得升级么；秉承着用新不用旧的原则，踩了一波坑比在此记录下来。

## 为了方便起见， 以下
> - **start** 为 yarn start
> - **build** 为 yarn build  
> - 注释内容皆为注释**下一行**

## 开始安装 webpack4
> webpack4+ 后推崇 cli 方式
```powershell
$ yarn add webpack webpack-cli
# "webpack": "^4.5.0",
# "webpack-cli": "^2.0.14",
```

- 创建以下目录
```
└─src
|      index.js
│
│  index.html
│  package.json
│  README.md
│  yarn-error.log
│  yarn.lock
│  .gitignore
 ```

## 体验 webpack4 0 配置
> entry ：默认为 src/index 。  
> output：默认为 dist ，文件名默认为 main.js 。  
> mode：为 production 和 development （必选）。 

- 编辑 index.html & index.js 为：  
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
      <title>初探 webpack4</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./dist/main.js"></script>
  </body>
</html>
```
```javascript
//index.js
console.log('webpack 4')
```
执行 webpack ，结果将输出在 dist 文件夹内，在浏览器中打开 index.html 将看到预期结果。


## 正式开始
1. webpack 4 必须安装 CLI 
> 官方的介绍是这样的： 
不安装将会报 **error** 。

2. 默认提供 mode 选项
值为 development(开发环境) || production(生产环境)  
不需要自行判断是生产环境还是开发环境，直接在配置下增加字段。  
- development：默认启用 热加载/缓存 等。  
- production： 默认启用代码压缩等功能。 
```javascript
mode: development || production ;
```

3. CommonsChunkPlugin 的弃用
```javascript
// webpack3
new webpack.optimize.CommonsChunkPlugin({
      names: ['common','vendor'],
      filename: './common/[name].bundle.js',
      minChunks: 2,
    })
// webpack4
  optimization: {
    minimize: true,
    splitChunks: {
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      minChunks: 2,
      cacheGroups: {
        default: false,
        commons: {
          filename: './commons/[name].[hash:8].js',
          name: "commons",
          chunks: "initial",
          minChunks: 2
        },
      vendor: {
        test: /node_modules/,
        filename: './vendor/[name].[hash:8].js',
        name: "vendor",
        chunks: "initial",
        minChunks: 1
      }
    }
  }
}
```

4. extract-text-webpack-plugin 将不再支持
改用 MiniCssExtractPlugin 这个插件,具体内如可查看官方 Issue 。
~~据说 extract-text-webpack-plugin 还可以用~~
```powershell
yarn add mini-css-extract-plugin
```
配置如下：
```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

plugins:[
  ...
  new MiniCssExtractPlugin({
        filename: "./css/[name].[hash:8].css",
        //chunkFilename: "[name].css"
      })
]
....
modules: {
  ....
  rules: [
    {
    test: /\.css$/,
    use: [{
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
          outputPath: './css/',
        }
    },
    {loader: 'postcss-loader'},
  }]
}

```

## 总结
### webpack4更改内容
> [change log](https://github.com/webpack/webpack/releases)

  1. entry ：默认为 src/index  
  2. output：默认为 dist 
  3. 新增 mode：为 production 和 development （必选）
  4. 默认热加载
  5. 新增cli
  6. 生产环境默认开启了很多代码优化（ minify，splite 等),即不需要 UglifyJsPlugin
  7. CommonsChunkPlugin -> optimization.splitChunks
  8. ~~extract-text-webpack-plugin -> MiniCssExtractPlugin~~
