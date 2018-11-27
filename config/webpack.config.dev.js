
'use strict'

const merge = require('webpack-merge')

const paths = require('./paths')
const base = require('./webpack.config.base')

module.exports = merge(base, {
  devServer: {
    contentBase: paths.public,
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 5600,
  },
})
