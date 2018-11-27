
'use strict'

const path = require('path')

// Contains aliases for webpack. If an alias is added or removed here,
// the same should also happen to .flowconfig name mapper.

module.exports = {
  '~': path.join(__dirname, 'src'),
  '~types': path.join(__dirname, 'types'),
}
