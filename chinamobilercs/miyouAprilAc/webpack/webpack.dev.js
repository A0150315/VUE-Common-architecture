const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const webpack = require("webpack");

module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader','css-loader','postcss-loader']
        }]
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
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