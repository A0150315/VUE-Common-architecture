const merge = require('webpack-merge');
const webpack = require("webpack");
const common = require('./webpack.common.js');

module.exports = merge(common, {
    resolve: {
        alias: {
            vue: 'vue/dist/vue.min.js'
        }
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.BannerPlugin(`This file is created by JasonTan`) //注释
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