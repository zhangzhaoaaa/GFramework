/**
 * Created by zhangmike on 16/10/13.
 */
var webpack = require('webpack');
var path = require('path');
var rootPath = path.join(__dirname, '../');

module.exports = {
    entry: './src/index.js',
    output: {
        path: rootPath + '/dist',
        filename: 'gmp.min.js'
    },
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel"
        }
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};