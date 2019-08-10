const path = require('path'),
webpack = require('webpack'),
VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/main.js',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      "@": path.resolve(__dirname, '../src')
    },
    extensions: ['.ts', '.js', '.scss', '.css', '.png', '.jpg', '.jpeg', '.gif', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, '../node_modules'),
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.(png|jpe?g|gif|bmp|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8k将图片转换成base64
              name: '[path][name].[ext]?[hash：8]'
            }
          },
          {
            loader: 'image-webpack-loader', // 图片压缩
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash：8]' //path/to/file.png?e43b20c0
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),

    //编译进度
    new webpack.ProgressPlugin(),
  ]
}