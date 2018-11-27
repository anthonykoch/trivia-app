
'use strict'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')

const aliases = require('../alias.js')
const paths = require('./paths')

module.exports = {
  context: paths.context,
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: {
    app: [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      '@babel/polyfill',
      './src/index.tsx',
    ],
  },
  output: {
    path: paths.outputDest,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      ...aliases,
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: 'awesome-typescript-loader?errorsAsWarnings',
      //   exclude: /node_modules/
      // },
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
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
