const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const webpack = require("webpack");

module.exports = merge(common, {
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./static",
    compress: false,
    port: 80,
    hot: true,
    historyApiFallback: true,
    proxy: {
      //设置代理服务器，用于调试接口
      "/htmlCall/": {
        target: "https://4dad6e.natappfree.cc",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/htmlCall/": "/htmlCall/"
        }
      }
    }
  },
  plugins: [new webpack.NamedModulesPlugin()],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm.js"
    }
  }
});
