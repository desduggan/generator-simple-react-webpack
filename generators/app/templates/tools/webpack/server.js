var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.dev.js');
var path = require('path');

  // First we fire up Webpack an pass in the configuration
  var bundleStart = null;
  var compiler = Webpack(webpackConfig);

  // We give notice in the terminal when it starts bundling and
  // set the time it started
  compiler.plugin('compile', function() {
    console.log('-= Change detected. Compiling project...');
    bundleStart = Date.now();
  });

  // We also give notice when it is done compiling, including the
  // time it took. Nice to have
  compiler.plugin('done', function() {
    console.log('-= Compile complete in ' + (Date.now() - bundleStart) + 'ms.');
  });

  var bundler = new WebpackDevServer(compiler, {
    // the location of bundle.js and index.html. In this case relative. 
    contentBase: './dist',
    // tell webpack where to serve the files from, relative to contentBase
    publicPath: '/',
    // Configure hot replacement
    hot: true,
    // The rest is terminal configurations
    quiet: false,
    stats: { colors: true }
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(webpackConfig.port, 'localhost', function () {
    console.log('Listening at localhost:'+webpackConfig.port);
  });
