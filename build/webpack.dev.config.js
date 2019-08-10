const merge = require('webpack-merge'), 
webpack = require('webpack'),
webpackBaseConfig = require('./webpack.base.config'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
path = require('path')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: `[name].[hash:8].js`,
    chunkFilename: `[name].[hash:8].js`,
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // you can also read from a file, e.g. `variables.scss`
              data: `$color: red;`
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //热更新
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      title: 'webpack-demo',
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: ''
    }),

    //持久化缓存
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    host: 'localhost',
    port: 8080,
    hot: true,
    compress: true,//服务器压缩
    proxy: {},
    progress: true
  }
})