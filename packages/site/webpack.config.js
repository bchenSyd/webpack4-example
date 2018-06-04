const path = require("path");
const chalk = require("chalk");
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['last 2 versions']
                })
              ]
            }
          },
          "less-loader"]
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            limit: 10000,
            minetype: 'image/svg+xml',
          },
        }],
      },
      {
        test: /\.(ico)|((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        }]
      },
    ]
  },
  externals: [
    function (context, request, callback) {
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      title: 'recompose example'
    }),
    new webpack.HotModuleReplacementPlugin() //required when run from wds cli
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less']
  },
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
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
