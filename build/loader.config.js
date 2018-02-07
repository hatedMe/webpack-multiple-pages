const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


function getLoader(loader) {
    return {
        "test": new RegExp(`.${loader}$`),
        "loader": ExtractTextPlugin.extract({
            use: [{
                loader: 'css-loader'
            }, {
                loader: `${loader}-loader`
            }, {
                loader: 'postcss-loader'
            }],
            fallback: "style-loader",
            publicPath: '../../'
        })
    }
}

function cssLoaders() {
    return [
        getLoader('css'),
        getLoader('less'),
        getLoader('sass'),
        getLoader('stylus'),

    ]
}

module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }],
                fallback: "style-loader",
                publicPath: '../../'
            })
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: `less-loader`
                }, {
                    loader: 'postcss-loader'
                }],
                fallback: "style-loader",
                publicPath: '../../'
            })
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: `sass-loader`
                }, {
                    loader: 'postcss-loader'
                }],
                fallback: "style-loader",
                publicPath: '../../'
            })
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: `stylus-loader`
                }, {
                    loader: 'postcss-loader'
                }],
                fallback: "style-loader",
                publicPath: '../../'
            })
        }]
    }
}
