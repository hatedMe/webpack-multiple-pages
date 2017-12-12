const path = require('path');
const webpack = require('webpack');



function resolve(dir) {
    return path.join(__dirname, '..', dir)
}



module.exports = {
    entry: {
        app: './src/main.js'
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
            }, {
                test: /\.css/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ejs'],
        alias: {

        }
    },
}
