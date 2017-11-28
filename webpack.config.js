var webpack = require('webpack');
var ip = require('ip').address();
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPlugin_Index= new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    chunks : ["index_bundle"],
    inject: 'body'
});

var HTMLWebpackPlugin_Report = new HtmlWebpackPlugin({  // Also generate a test.html
    template: 'app/report.html',
     filename: 'report.html',
     chunks : ["report_bundle"],
     inject: 'body'
});

var HTMLWebpackPlugin_Config= new HtmlWebpackPlugin({
    template: __dirname + '/app/config.html',
    filename: 'config.html',
    chunks : ["config_bundle"],
    inject: 'body'
});


var DefinePlugin = new webpack.DefinePlugin({
  'process.env':{
    'NODE_ENV': JSON.stringify('development'),
    'HOST_URL': JSON.stringify('http://' + ip + ':3000'),
    'FILE_SERVER_URL':JSON.stringify('http://' + ip + ':8000')
  }
});

module.exports = {
  entry: {
     index_bundle : './app/index/index.js',
     report_bundle : './app/report/report.js',
     config_bundle : './app/config/config.js'
  },

  output: {
      path: __dirname + '/dist',
      filename: "[name].js",
  },

  module: {
    loaders: [
        {
          test: /\.jsx$/,
          loader: "babel-loader",
          query: {
          presets: ['react', 'es2015']
            }
        },
        {
          test: /\.js$/,
          include: __dirname + '/app',
          loader: "babel-loader",
          query: {
          presets: ['react', 'es2015']
            }
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }

    ]
  },
  plugins: [
      HTMLWebpackPlugin_Index,
      HTMLWebpackPlugin_Report,
      HTMLWebpackPlugin_Config,
      DefinePlugin]
};
