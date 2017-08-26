const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: `./src/cjs-wrapper.js`,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'generate-maze.js',
    library: 'generateMaze',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-2']
        }}
    ]
  }
};
