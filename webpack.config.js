'use strict';
let webpack = require('webpack');

module.exports = {
  entry: `./src/cjs-wrapper.js`,
  output: {
    path: `./dist/`,
    filename: 'generate-maze.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.(es6|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-2']
        }}
    ]
  }
};
