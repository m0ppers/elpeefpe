var path = require('path');
// import plugin 
var BomPlugin = require('webpack-utf8-bom');

var config = {
  cache: true,
  entry: './elpeefpe-win.jsx',
  output: {
    filename: 'elpeefpe-win.js'
  },

  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel'}
    ]
  }
};
if (path.basename(process.argv[1]) != 'webpack-dev-server.js') {
  config.plugins = [
    // Add plugin in plugins list 
    // true for adding bom 
    // false for removing bom 
    new BomPlugin(true)
  ];
}

module.exports = config;