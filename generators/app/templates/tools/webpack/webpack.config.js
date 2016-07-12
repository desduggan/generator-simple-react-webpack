var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname,'..','..','node_modules');
var buildPath = path.resolve(__dirname,'..','..', 'dist');

var config = {  
  output: {
    // Where the asset is built to 
    path: buildPath,
    // Get the name of the output from the package.json
    filename: 'app.js',
    // the target build format
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [],
  module: {
  loaders: [
     //jsx injected here from other webpack configs
    { 
      test: /\.csv?$/, 
      loader: 'dsv-loader' 
    }, {
      test: /\.(html)$/,
      loader: 'file?name=[name].[ext]',
      exclude: [nodeModulesPath]
    }, {
      test: /\.(json)$/,
      loader: 'json',
      exclude: [nodeModulesPath]
    }, {
      test: /\.(css)$/,
      loader: "style!css-loader?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version"
    }, {
      test: /\.(scss)$/,
      loader: 'style!css!sass'
    }, {
      test: /\.(gif|png|jpg|svg)$/,
      loader: 'url?name=img/[name].[ext]'
    }, {
      test: /\.(svg|woff|woff2|ttf)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?name=font/[name].[hash].[ext]&limit=8192'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'file'}
    ]
  },
  port: 3001  
};


module.exports = config;
