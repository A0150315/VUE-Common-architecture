const webpack = require("webpack");
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: './entry.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'postcss-loader'
            })
        }, {
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
            template: './template/template.html',
            // chunks:['main','manifest','style']需要什么加什么，默认全加
        }),
        new webpack.NamedModulesPlugin(), //hot维护插件
        new webpack.HotModuleReplacementPlugin(), //hr插件
        new ExtractTextPlugin({ //CSS分离插件
            filename: "style.[chunkhash].css",
            allChunks: true,
            ignoreOrder: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ]
}