# vue-ts-project

## 目录结构

``` txt
| --- public
|      | --- favicon.ico： 显示在浏览器标签栏标题前面的小图标
|      | --- index.html： 编译html文件的模板
| --- src
|      | --- api： 存放封装的api请求方法
|      | --- assets： 存放一些图片、字体等静态资源
|      | --- components： 一些可以复用的组件存放在这里
|      | --- styles： 存放公共的样式文件
|      | --- views： 页面视图vue文件存放在这里
|      | --- router
|             | --- index.ts：前端路由配置文件
|      | --- store
|             | --- module：用于存放拆分的vuex模块
|             | --- index.ts：状态管理vuex配置文件
|      | --- main.ts： 项目入口文件
|      | --- shims-tsx.d.ts： 增加对JSX语法的类型支持的声明文件
|      | --- shims-vue.d.ts： 用于让编译器识别.vue后缀的文件
| --- .brwserslistrc： 配置编译后的代码需要支持的浏览器列表
| --- .gitignore： 设置提交到git时需要忽略的文件
| --- babel.config.js： babel的配置文件
| --- package-lock.json： 锁定依赖版本号的文件
| --- package.json： npm项目最基本的配置文件
| --- postcss.config.js： postcss的配置文件
| --- README.md： 项目介绍文件
| --- tsconfig.json： TypeScript编译选项配置文件
| --- tslint.json： TSLint配置文件
```
