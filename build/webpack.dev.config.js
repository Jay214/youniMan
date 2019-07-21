const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const htmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const devWebpackConfig = merge(baseWebpackConfig, {
   /*  output: {
        publicPath: 'static/image'
    }, */
    //mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        clientLogLevel: 'warning',
        port: 90,
        host: 'localhost',
        hot: true,
        hotOnly: true,
        open: true,
        overlay: true,
        publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        //make the env globaly
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
          }),
    ],
})

module.exports =  new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT||80
    //check the open port
    portfinder.getPort((err, port) => {
        if(err) {
            reject(err)
        } else {
             // publish the new Port, necessary for e2e tests
             process.env.PORT = port
             // add port to devServer config
             devWebpackConfig.devServer.port = port
             devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                  messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
                }
              }))

             resolve(devWebpackConfig)
        }
    })
})

