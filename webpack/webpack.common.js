const webpack = require("webpack");
const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const ASSET_PATH = process.env.ASSET_PATH || './';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './entry.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: ASSET_PATH
    },
    module: {
        rules: [{
                test: /\.html$/, // Only .html files
                use: 'html-loader?' + JSON.stringify({
                    attrs: ['img:src']
                })
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', 'img/[name].[hash].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', 'fonts/[name].[hash].[ext]')
                }
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }, {
                test: /\.node$/,
                use: 'node-loader'
            },
            {
                test: /\.ts|\.tsx$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx', '.vue']
    },
    plugins: [
        new HtmlWebpackPlugin({ //自动生成HTML
            title: 'Output Management',
            template: './template/template.html',
            // chunks:['main','manifest','style']需要什么加什么，默认全加
        }),
        new webpack.HotModuleReplacementPlugin(), //hr插件
        new VueLoaderPlugin()
    ],
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    }
}