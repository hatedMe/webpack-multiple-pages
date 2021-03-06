const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const cssLoader = require('./loader.config.js');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = merge(cssLoader,{
    entry: {
        app: './src/main.js',
        vendors: ['./src/vendors.js'],
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.ejs$/,
                exclude: /node_modules/,
                use: ['ejs-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[ext]',
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ejs'],
        alias: {
            '@': resolve('src'),
            '^': resolve('static')
        }
    },
})