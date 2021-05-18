const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: `./src/cjs-wrapper.js`,
  mode: 'production',
  optimization: {
    minimize: true
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'generate-maze.js',
    library: 'generateMaze',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
};
