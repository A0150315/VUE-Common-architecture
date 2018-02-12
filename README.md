# 目录结构以及说明
```
│  .babelrc                         // es6,es7配置 @@@@@
│  entry.js                         // app入口 @@@@@
│  package.json                     // @@@@@
│  postcss.config.js                // postcss配置 @@@@@
│  yarn.lock                        // @@@@@
│
├─assets                            // 资源文件夹 
├─components                        // 组件文件夹 
│      start.vue                    // 组件演示文件 ------------
│
├─config                            // webpack的配置文件夹 @@@@@
│      webpack.common.js            // webpack公共环境配置
│      webpack.dev.js               // webpack开发环境配置
│      webpack.prod.js              // webpack生产环境配置
│
├─dist                              // webpack-dev-server监听目录
│  └─static                         // webpack-dev-server静态文件目录 
├─page                              // 展示页面文件夹 
│      other.vue                    // es7 async await 发送ajax请求演示文件 ------------
│      start.vue                    // VUEX 以及 px2rem postcss插件演示文件 ------------
│
├─plugins                           // 插件以及公用模块文件夹
│  ├─postcss-px2rem                 // 像素转rem的postcss插件，仍在开发中，但可以投入生产环境 @@@@@
│  │      index.js
│  │
│  └─service                        // 服务管理文件夹
│          config.js                // 服务配置
│          index.js                 // axios封装
│
├─route                             // vue-router 入口
│      index.js                     // vue-router 配置
│
├─store                             // vuex 入口
│  │  index.js
│  │
│  └─modules
│          client.js
│
├─style                             // 样式，该目录无法监听
│      global.css
│
└─template                          // 模板文件夹
        template.html
```
- PS：
    - 说明中带“------------”为可删除的文件或文件夹
    - 说明中带“@@@@@”为不推荐修改的文件或文件夹
# 开发建议
## 1. 遵循代码规范；
## 2. 高度模块化；
## 3. 数据原子化；
## 4. 提高组件复用性；
## 5. 尽可能全程数据驱动，不直接操作DOM节点；
## 6. 避免使用$refs，$parent，$children;
## 7. 异步请求使用Promise、async、await语法糖，提高代码维护性；
## 8. 尝试grid布局，不作硬性要求

# 使用方法
```
下载：
git clone git@github.com:A0150315/VUE-Common-architecture.git

安装环境：
npm install 或 yarn -i

运行：
npm run start

打包：//默认打包目录为dist
npm run build
```

# 开发小提醒：
该环境是我借鉴了很多开发者的思想所产生的，包括webpack的环境分离、nuxt的目录结构、小程序demo中的配置与服务分离等，难免会有许多不足，希望开发者们可以一同完善！

该环境适用与搭建vue的通用静态页面，服务端页面请到[Nuxt官网](https://zh.nuxtjs.org/)了解！

## 1.saladcss-bem的使用
为了方便开发，已为saladcss-bem添加配置，详情请参考[postcss配置](./postcss.config.js),使用方式参考[start.vue](./components/start.vue)
## 2.postcss-px2rem
该包中的“px2rem”不是Npm中的“postcss-px2rem”,这是根据我平常开发的环境中使用所编写出来的，可以完善的地方还太多，目前配置750px的环境下使用 ，可自定义配置，使用方法：
```
rem(100px) 通过编译后变成-> 1rem
```
根节点的font-size在[template.html](./template/template.html)的script标签中动态设置了，该方法是为了提高代码维护性，直观性。[查看代码](./page/start.vue)
## 3. axios的使用
在plugins/service的[config.js](./plugins/service/config.js)中设置域名端口以及地址，在相同目录下的[index.js](./plugins/service/index.js)中封装好请求方式，使用时只需把plugins/service引入即可快速使用。[查看代码](./page/other.vue)
## 4. css文件无法监听
因为使用了代码分割，css文件导入后马上生成了新的css文件，无法实时监听到原先的css的修改。
