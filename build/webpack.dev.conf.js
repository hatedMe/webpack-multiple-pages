const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.config.js')



Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})




module.exports = merge(baseWebpackConfig,{
    devtool: '#cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'build.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.ejs',
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ]


})