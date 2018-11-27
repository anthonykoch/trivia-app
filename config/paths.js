'use strict'

const path = require('path')

const context = path.join(__dirname, '../')

module.exports = {
  context,
  outputDest: path.join(context, 'build'),
  publicSrc: path.join(context, 'public'),
  appHtml: path.join(context, 'public/index.html'),
}
