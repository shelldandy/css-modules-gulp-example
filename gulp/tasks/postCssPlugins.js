const path = require('path')
const config = require('../config')
const mergeArrays = require('./mergeArrays')

let cssModules = {}

const plugins = [
  require('autoprefixer')({ browsers: config.browsers }),
  require('postcss-modules')({
    generateScopedName: config.production ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
    getJSON: function (cssPath, json) {
      const pathWithoutExtension = cssPath.split('.css')[0]
      const exploded = pathWithoutExtension.split(path.sep)
      const mainIndex = exploded.indexOf('main')
      const dirs = exploded.slice(mainIndex + 1)
      dirs.reduce(mergeArrays, cssModules)
    }
  })
]

module.exports = plugins
exports.checkJson = () => cssModules
