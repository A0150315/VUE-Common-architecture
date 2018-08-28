const merge = require('webpack-merge');
const webpack = require("webpack");
const common = require('./webpack.common.js');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'postcss-loader'
            })
        }]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.BannerPlugin(`This file is created by JasonTan`), //注释
        new ExtractTextPlugin({ //CSS分离插件
            filename: "style.[chunkhash].css",
            allChunks: true,
            ignoreOrder: true
        }),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.min.js'
        }
    },
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    }
});

// module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.optimize.UglifyJsPlugin({
//         sourceMap: true,
//         compress: {
//             warnings: false,
//             drop_debugger: true,
//             drop_console: true
//         }
//     })
// ])