const merge = require('webpack-merge');
const webpack = require("webpack");
const common = require('./webpack.common.js');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'postcss-loader'
            })
        }]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.min.js'
        }
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.BannerPlugin(`This file is created by JasonTan`), //注释
        new ExtractTextPlugin({ //CSS分离插件
            filename: "style.[chunkhash].css",
            allChunks: true,
            ignoreOrder: true
        }),
    ]
});

module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
        }
    })
])