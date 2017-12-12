const express = require('express');
const webpack = require('webpack');
const path = require('path');
const opn = require('opn');

const webpackConfig = require('./webpack.dev.conf');

const compiler = webpack(webpackConfig);
const app = express();


const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})


var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
});




// 当tml-webpack-plugin template更改之后，强制刷新浏览器
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

app.use(devMiddleware);

app.use(hotMiddleware);
//app.use(express.static('../dist'))

app.listen(4000, () => {
    console.log("成功启动：localhost:" + 4000)
});