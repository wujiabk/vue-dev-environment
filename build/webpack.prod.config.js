const merge = require('webpack-merge'),
webpackBaseConfig = require('./webpack.base.config'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
path = require('path'),
glob = require('glob'),
webpack = require('webpack'),
{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
ManifestPlugin = require('webpack-manifest-plugin'),
MiniCssExtractPlugin = require('mini-css-extract-plugin'),
PurifyCSSPlugin = require('purifycss-webpack')
// UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
// OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),


module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: `[name].[chunkhash:8].js`,
    chunkFilename: `[name].[chunkhash:8].js`,
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/"
  },
  optimization: {
    // minimizer: [
    //   new UglifyJsPlugin({
    //     cache: true,
    //     parallel: true,
    //     sourcMap: true
    //   }),
    //   new OptimizeCSSAssetsPlugin({}),
    // ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
        test: /[\\/]node_modules[\\/]/, // 匹配node_modules目录下的文件
        priority: -10 // 优先级配置项
      },
      default: {
        minChunks: 2,
        priority: -20, // 优先级配置项
        reuseExistingChunk: true
      }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {}
          },
          {
            loader: 'postcss-loader',
            options: {}
          },
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true,
              // you can also read from a file, e.g. `variables.scss`
              data: `$color: red;`
            }
          },
        ]
      },
    ]
  },
  plugins: [
    //持久化缓存
    new webpack.HashedModuleIdsPlugin(),

    //清目录
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-demo',
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../public/index.html'),
      minify: {
        removeRedundantAttributes: true, // 删除多余的属性
        collapseWhitespace: true, // 折叠空白区域
        removeAttributeQuotes: true, // 移除属性的引号
        removeComments: true, // 移除注释
        collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
      },
      favicon: ''
    }),

    //提取css
    new MiniCssExtractPlugin({
      filename: 'assets/style/[name].[chunkhash:8].css',
      chunkFileName: 'assets/style/[name].[chunkhash:8].css',
      allChunks: true
    }),

    //删除多余的CSS
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, '../public/*.html'))
    }),

    //生成manifest清单
    new ManifestPlugin()
  ]
})