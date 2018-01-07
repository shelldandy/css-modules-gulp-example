const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()
const production = config.production
const moduleImporter = require('sass-module-importer')

const POSTCSS_PLUGINS = [
  require('autoprefixer')({ browsers: config.browsers }),
  require('postcss-modules')({
    generateScopedName: production ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
    getJSON: function (cssFileName, json) {
      const fs = require('fs-path')
      const path = require('path')
      const cssName = path.basename(cssFileName, '.css')
      const jsonFileName = path.resolve(`./${config.directories.src.cssModules}/${cssName}.json`)
      fs.writeFileSync(jsonFileName, JSON.stringify(json))
    }
  })
]

gulp.task('main:styles', () =>
  gulp.src(config.project.cssFiles)
    .pipe($.sass({importer: moduleImporter()}))
    .on('error', config.onError)
    .pipe($.postcss(POSTCSS_PLUGINS))
    .pipe($.groupCssMediaQueries())
    .pipe($.csscomb())
    .pipe($.concat('main.css'))
    .pipe(gulp.dest(config.directories.dist.styles))
)

gulp.task('vendor:styles', () =>
  gulp.src(config.project.cssVendorFile)
    .pipe($.sass({importer: moduleImporter()}))
    .on('error', config.onError)
    .pipe($.postcss([
      require('autoprefixer')({browsers: config.browsers})
    ]))
    .pipe($.groupCssMediaQueries())
    .pipe($.csscomb())
    .pipe(gulp.dest(config.directories.dist.styles))
)

gulp.task('styles', gulp.series('main:styles', 'vendor:styles'))
