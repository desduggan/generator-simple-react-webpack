var webpack = require('webpack');
var path = require('path');
var mainPath = path.resolve(__dirname,'..','..','src','index.jsx');
var srcPath = path.resolve(__dirname,'..','..', 'src');
var config = require('./webpack.config.js')

config.entry = [
    'webpack-dev-server/client?http://0.0.0.0:'+config.port, // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    mainPath // Your appʼs entry point
]

config.devtool = 'source-map'

config.plugins.push( new webpack.HotModuleReplacementPlugin() )
config.plugins.push( new webpack.ProvidePlugin({
      'react': "react"
    })
)

config.module.loaders.unshift({
      test: /\.jsx$/,
      loaders: ['react-hot', 'babel'],
      exclude: ['node_modules']
})

module.exports = config;
