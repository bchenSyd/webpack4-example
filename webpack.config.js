const path = require('path');
const ExternalsPlugin = require('./plugin');

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
  },
  plugins:[
    new ExternalsPlugin({
      type: 'commonjs',
      test:/node_modules/
    })
  ]
};