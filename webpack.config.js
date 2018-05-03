const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module:{
    rules:[{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use:{
        loader: 'babel-loader'
      }
    }]
  }
};