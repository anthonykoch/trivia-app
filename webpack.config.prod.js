'use strict'

const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const paths = {
  outputDest: path.join(__dirname, 'build'),
  publicSrc: path.join(__dirname, 'public'),
  appHtml: path.join(__dirname, 'public/index.html'),
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: [
      '@babel/polyfill',
      './src/index.js'
      ],
  },
  output: {
    path: paths.outputDest,
    publicPath: '/',
    filename: 'static/scripts/[name].[hash:8].js',
    chunkFilename: 'static/scripts/[name].[chunkhash:8].chunk.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
        },
      },
    },
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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
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
