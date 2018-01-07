const config = require('../config')

let json = {}

const plugins = [
  require('autoprefixer')({ browsers: config.browsers }),
  require('postcss-modules')({
    generateScopedName: config.production ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
    getJSON: function (cssPath, json) {
      const path = require('path')
      // An array of directories
      const exploded = cssPath.split(path.sep)
      // but we only need starting from the main styles directory
      const mainIndex = exploded.indexOf('main')
      let dirs = exploded.slice(mainIndex + 1)
      // remove the css filename with extension
      dirs.pop()
      // add again but without extension
      const cssName = path.basename(cssPath, '.css')
      dirs.push(cssName)
      // TODO: Foreach item in the directories
      // create a single object recursively into json
    }
  })
]

module.exports = plugins
exports.checkJson = () => json
