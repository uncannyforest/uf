const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.yaml$/,
        use: 'js-yaml-loader',
      }, {
        test: /\.html$/,
        type: 'asset/source',
      }
    ]
  }
};

module.exports = config;
