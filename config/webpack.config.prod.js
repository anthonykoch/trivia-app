
'use strict'

const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const base = require('./webpack.config.base')

module.exports = merge(base, {
  output: {
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
  ],
})
