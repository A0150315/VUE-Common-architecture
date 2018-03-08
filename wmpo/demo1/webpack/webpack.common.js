const webpack = require("webpack");
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './wmpo/demo1/entry.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: ['html-loader']
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: ['babel-loader']
        }, {
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ //自动生成HTML
            title: 'Output Management',
            template: './wmpo/demo1/src/template/template.html',
            // chunks:['main','manifest','style']需要什么加什么，默认全加
        }),
        new webpack.HotModuleReplacementPlugin(), //hr插件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ]
}