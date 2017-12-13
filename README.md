## 解决痛点 ：


公司处于发展阶段，前后端结构不分离，项目需要后端渲染，SPA不给用。页面模板不好出。 </br>
老板东看一些布局，西看一些布局。能否快速修改模板以供版本迭代？ </br>
JS不压缩影响加载速度？老式项目需要jQuery作为底层，如何全局部署供后台使用  </br>
针对迭代版本修改css能否快速进行压缩打包？  </br>
能否将js分为底层包、业务包、逻辑包分层打包实践？  </br>
能否将模板分为类似SPA组件式开发？ </br>
ES6、ES7、ES8代码好用能不能给后台使用？ </br>
能否开发就打包解决浏览器缓存？实现修改即用？




## 说明
只是主要解决不在SPA的环境，利用组件出渲染模板 <br />
脚手架参考vue-cli借鉴修改 <br />
底层调用bootstrap样式、jqueryDOM、让全局能访问到$ 故使将$挂载到window上面 <br />
使用express做开发环境实现热加载以便后续使用跨域请求代理 <br />

## 使用 

克隆项目 <br />
```git clone https://github.com/hatedMe/webpack-multiple-pages.git```

安装npm依赖包 <br />
```npm install```

开发环境 ===> 浏览器打开 ```localhost:4000``` <br />
```npm run dev```

打包部署 ===> 根目录下dist为打包文件 <br />
```npm run build```

## 项目目录
```md
├── build                                       // webpack配置文件
│   ├── server.js                               // 开发环境下入口文件
│   ├── webpack.base.config.js                  // webpack基本配置
│   ├── webpack.build.config.js                 // webpack打包配置
│   ├── webpack.build.dev.js                    // webpack开发环境配置
├── dist                                        // 项目打包文件
├── src                                         // 源码目录
│   ├── assets                                  // 资源文件
│   │   ├── app.less                            // 业务全局css
│   ├── components                              // 组件文件
│   │   ├── head.ejs                            // 头部模板
│   │   ├── foot.ejs                            // 尾部模板
│   ├── views                                   // 页面文件
│   │   ├── index                               // 首页文件
│   │   │   └── index.ejs                       // 首页模板文件
│   │   │   └── index.js                        // 首页入口文件
│   ├── main.js                                 // 打包入口文件
│   ├── vendors.js                              // 业务包文件（底层js库打包）
├── static                                      // 静态资源文件

```

## 最后
使用技术栈：webpack + babel + less + ejs + express + node 

参考 :
[webpack](http://webpack.github.io/docs/) <br />
[less](http://lesscss.org/) <br />
[vue-cli](https://github.com/vuejs/vue-cli) <br />
[babel](http://babeljs.io/) <br />
[express](https://github.com/expressjs/express) <br />
[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) <br />

