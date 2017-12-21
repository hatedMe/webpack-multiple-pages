const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require("glob");
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.config');


function getEntry(globPath) {
    var entries = {},
        basename, tmp, pathname;

    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
        
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        entries[basename] = entry;
    });
    return entries;
}



const Entry = getEntry('./src/views/**/*.js');
const HtmlTpl = getEntry('./src/views/**/*.ejs');
const htmlConfig = () => {
    let config = [];

    for( let attr in HtmlTpl ){
        config.push(
            new HtmlWebpackPlugin({
                filename: `${attr}.html`,
                template: `${HtmlTpl[attr]}`,
                inject: true,
                minify: {
                    removeComments: true, //删除注释
                    collapseWhitespace: false, // 压缩
                    removeAttributeQuotes: false // 去掉路径引号
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                chunksSortMode: 'dependency',
                chunks: ['vendors', 'app',`${attr}`]
            })
        )
    }

    return config;
}

console.log(htmlConfig() );
module.exports = merge(baseWebpackConfig, {
    entry : Entry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './static/js/[name].js' // js/[name].[chunkhash].js
    },
    plugins: [
        new CleanWebpackPlugin(
            ['dist'], {
                root: path.resolve(__dirname, '../'), //根目录
                verbose: true, //开启在控制台输出信息
                dry: false　　 //启用删除文件
            }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            comments: false
        }),
        new ExtractTextPlugin({
            filename: './static/css/[name].css' //  ./css/[name].[contenthash].css
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            }
        }),
        new webpack.BannerPlugin(`
        
                    ┏┓　　　┏┓+ + 
                    ┏┛┻━━━┛┻┓ + + 
                    ┃　　　　　　　┃ 　 
                    ┃　　　━　　　┃ ++ + + + 
                    ████━████    ┃+ 
                    ┃　　　　　　　┃ + 
                    ┃　　　┻　　　┃ 
                    ┃　　　　　　　┃ + + 
                    ┗━┓　　  ┏━┛ 
                        ┃　　　┃　　　　　　　　　　　 
                        ┃　　　┃ + + + + 
                        ┃　　　┃　　　  Code is far away from bug with the animal protecting　　　　　　　 
                        ┃　　　┃ + 　 　神兽保佑  =====>   代码无BUG!　 
                        ┃　　　┃ 
                        ┃　　　┃　　+　　　　　　　　　 
                        ┃　 　　┗━━━┓ + + 
                        ┃ 　　　　　　　┣┓ 
                        ┃ 　　　　　　　┏┛ 
                        ┗┓┓┏━┳┓┏┛ + + + + 
                        ┃┫┫　┃┫┫ 
                        ┗┻┛　┗┻┛+ + + + 
          
                中数科技有限公司版权所有，翻版必究
                
                ${ new Date }



        `),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: 'static',
            ignore: ['.*']
        }])
    ].concat( htmlConfig() ), 
    externals: {

    }
})