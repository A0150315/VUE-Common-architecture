const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common.js");
const path = require("path");
const fs = require("fs");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

try {
  fs.accessSync(path.resolve(__dirname, `../dist`), fs.F_OK);
} catch (e) {
  fs.mkdirSync(path.resolve(__dirname, `../dist`));
}


const emptyDir = fileUrl => { // 异步删除，避免堵塞
  const files = fs.readdirSync(fileUrl); //读取该文件夹
  files.forEach(file => {
    const stats = fs.statSync(path.resolve(fileUrl, file));
    if (stats.isDirectory()) {
      emptyDir(path.resolve(fileUrl, file));// 递归删除
    } else {
      fs.unlinkSync(path.resolve(fileUrl, file));
    }
  });
};

emptyDir(path.resolve(__dirname, "../dist"));

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "postcss-loader"
        })
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.BannerPlugin(`This file is created by JasonTan`), //注释
    new ExtractTextPlugin({
      //CSS分离插件
      filename: "style.[chunkhash].css",
      allChunks: true,
      ignoreOrder: true
    }),
    new CopyWebpackPlugin([{ from: "static" }])
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.min.js"
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
