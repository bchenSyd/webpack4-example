const path = require("path");
const chalk = require("chalk");
const webpack = require('webpack');
const ExternalsPlugin = require("./plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: [
    function(context, request, callback) {
      // console.log(chalk.blue(' got a module request: '+ request, 'context: '+ context))
      if (/^(\.|\/|\!)$/.test(request)) {
        // internal files;
        return callback();
      }

      if (/^your-external-lists$/.test(request)) {
        return callback(null, "commonjs " + request);
      }

      callback();
    }
  ],
  plugins:[
    new webpack.HotModuleReplacementPlugin() //required when run from wds cli
  ],
  devServer: {
    disableHostCheck: true,
    host:"0.0.0.0",
    port: 8080,
    historyApiFallback: true,

    //#######################################################################
    //> https://github.com/webpack/webpack/issues/1151#issuecomment-343800515 
    hot: true, // if you set `hot` to true within `devServer` section and run `webpack-dev-server` cli, you must
    // either `new webpack.HotModuleReplacementPlugin()` 
    // or, 
    // put `--hot` in cli options (which instruct wds to auto insert a HMRPlugin into your webpac.config.js)
    //#######################################################################
  }
};
