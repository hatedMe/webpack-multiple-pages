const express = require('express');
const webpack = require('webpack');
const path = require('path');
const opn = require('opn');

const webpackConfig = require('./webpack.dev.config');

var port = 4000;

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
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

app.use(devMiddleware);

app.use(hotMiddleware);



var staticPath = path.posix.join('/', 'static'); // express 静态文件托管
app.use(staticPath, express.static('./static'));




//  设置路由 ： 例如 /a.html ==> /a
app.get('/:viewname?', function(req, res, next) {
    let viewname = req.params.viewname;
    if( viewname == 'favicon.ico'  ){ 
        return next();
    }else{
        viewname = req.params.viewname ? 
        req.params.viewname + '.html' : 
        'index.html';
    }

    var filepath = path.join(compiler.outputPath, viewname);

    // 使用webpack提供的outputFileSystem
    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            // something error
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});






app.listen(port, () => {
    console.log("成功启动：localhost:" + port)
});