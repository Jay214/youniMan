//webpack.config.js
'use strict'
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
function resolve(dir){
    //console.log(path.resolve(__dirname, '../static/image'))
    return path.join(__dirname, '..', dir)
}

module.exports ={
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"js/[name].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                //exclude: /node_modules/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loaders: ['vue-style-loader', 'style-loader', 'css-loader']
            },
            {
                test: /\.(gif|jpe?g|png|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[hash:6].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: '[name].[hash:6].[ext]'
                }
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: '[name].[hash:6].[ext]'
                }
              },
             /*  { // 编译识别sass! 
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
             }  */
        ],
    },
    //防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    externals: {

    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, '../static/image'),
              to: 'static',
              ignore: ['.*']
            }
          ])
        //分离第三方库和公共模块
     /*    new webpack.optimize.splitChunks({
            name: ['vendor','runtime'],
            filename: '[name].js'
        }), */
    ]
   
}