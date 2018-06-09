
## 路径相关 paths.js
## todolist
- auto chunk

## tree
```powershell
├── dist                     # 生产目录
├── config                   # 配置文件
│   ├── webpack.config.js    # webpack 配置文件
│   └── postcss.config.js    # postcss 配置文件
├── src                      # 程序源文件
│   └── js                   # 入口
│   ├   └── index.js         # 匹配 view/index.html
│   ├   └── user         
│   ├   ├    ├── index.js    # 匹配 view/user/index.html
│   ├   ├    ├── list.js     # 匹配 view/user/list.html
│   ├   └── lib              # JS 库等，不参与路由匹配
│   ├       ├── jquery.js 
│   └── view                 
│   ├    └── index.html       # 对应 js/index.js
│   └── component             # 组件
│   ├    └── dialog           # Dialog 弹出层组件         
│   ├    └── other     
│   └── css                   # css 文件目录
│   ├    └── base.css          
│   ├    └── iconfont.css   
│   └── font                  # iconfont 文件目录
│   ├    └── iconfont.ttf         
│   ├    └── iconfont.css
│   └── img                   # 图片文件目录
│   ├    └── pic1.jpg         
│   ├    └── pic2.png     
│   └── template              # html 模板目录
│       └── layout.art        # layout 母模板     
```
```powershell
├─commons               # commons files
├─js                    # js
├─static                # 静态资源
├─vendor                # node_modules 依赖
├─app.html              # html 模板目录
├─about.html            # html 模板目录
```