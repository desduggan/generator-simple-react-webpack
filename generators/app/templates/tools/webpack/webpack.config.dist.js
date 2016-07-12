var webpack = require('webpack');
var path = require('path');
var mainPath = path.resolve(__dirname,'..','..','src','index.jsx');
var srcPath = path.resolve(__dirname,'..','..', 'src');
var config = require("./webpack.config.js");
var packageJson = require('../../package.json')

/** ============
NOTE: change the following per the dependencies
of the component you are developing. 
============ **/
config.externals = {
    // "react": "react",
    // "react-dom": "react-dom",
    // your dependencies here
    // "d3": "d3",
}

config.entry = mainPath;
config.devtool = 'none';
config.plugins = [
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.ProvidePlugin({
      'react': "react"
    })
];

config.module.loaders.unshift({
      test: /\.jsx$/,
      loaders: ['babel'],
      exclude: ['node_modules']
})

module.exports = config;
