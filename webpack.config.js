

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    entry: './css/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    plugins:  [
        new ExtractTextPlugin("app.css"), 
        new OptimizeCSSPlugin(), 
    ],
    module: {
        rules: [
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract({
                    use : 'css-loader'
                })
            }
        ]
    }
}