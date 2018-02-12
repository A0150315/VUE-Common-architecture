const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require("webpack");

module.exports = merge(common, {
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        compress: false,
        port: 8888,
        hot: true
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new webpack.NamedModulesPlugin()
    ]
});