const path = require('path');
const chalk = require('chalk');
const ExternalsPlugin = require('./plugin');

module.exports = {
  mode: 'production',
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
  externals: [
    function(context, request, callback) {
      console.log(chalk.blue(' got a module request: '+ request))
      if(/^(\.|\/|\!)$/.test(request)){
        // internal files;
        return callback();
      }

      if (/^your-external-lists$/.test(request)){
        return callback(null, 'commonjs ' + request);
      }

      callback();
    }
  ],
  plugins:[
    // new ExternalsPlugin({
    //   type: 'commonjs',
    //   test:/node_modules/
    // })
  ]
};