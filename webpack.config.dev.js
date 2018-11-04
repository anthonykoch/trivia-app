'use strict'

const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')

const paths = {
  outputDest: path.join(__dirname, 'build'),
  publicSrc: path.join(__dirname, 'public'),
  appHtml: path.join(__dirname, 'public/index.html'),
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      '@babel/polyfill',
      './src/index.js',
    ],
  },
  output: {
    path: paths.outputDest,
    publicPath: '/',
  },
  devServer: {
    contentBase: paths.public,
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 5600,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/,
        loader: [
          'style-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new ModuleNotFoundPlugin(paths.appPath),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  ],
}
