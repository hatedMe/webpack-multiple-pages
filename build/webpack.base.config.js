const path = require('path');
const webpack = require('webpack');







module.exports = {
    entry: {
        app: './src/main.js'
    },
    module:{
        rules:[
            {
                test: /\.ejs$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ejs-loader'
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json','.ejs'],
        alias: {

        }
    },
}