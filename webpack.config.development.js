/* eslint-disable global-require, react/jsx-first-prop-new-line */
const path = require('path');
const webpack = require('webpack');
/* eslint-enable global-require, react/jsx-first-prop-new-line */

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BROWSER': true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.less$/,
      loaders: ['style', 'css', 'less']
    },
    {
      test: /\.(jpg|jpeg|gif|png|ico|ttf|otf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=[path][name].[ext]'
    }]
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
};
