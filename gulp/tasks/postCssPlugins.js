const config = require('../config')

const plugins = [
  require('autoprefixer')({ browsers: config.browsers }),
  require('postcss-modules')({
    generateScopedName: config.production ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
    getJSON: function (cssPath, json) {
      const fs = require('fs-path')
      const path = require('path')
      const exploded = cssPath.split(path.sep)
      const mainIndex = exploded.indexOf('main')
      const rest = exploded.slice(mainIndex + 1)
      rest.pop()
      const cssName = path.basename(cssPath, '.css')
      rest.push(cssName)
      const finalString = rest.join('')
      const jsonFileName = path.resolve(`./${config.directories.src.cssModules}/${finalString}.json`)
      fs.writeFileSync(jsonFileName, JSON.stringify(json))
    }
  })
]

module.exports = plugins
