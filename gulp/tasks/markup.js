const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()
const production = config.production
const fs = require('fs')

const POSTHTML_PLUGINS = [
  require('posthtml-css-modules')(`${config.directories.src.cssModules}/`)
]

gulp.task('markup', () =>
  gulp.src(config.directories.src.markup + '/*.pug')
    .pipe($.pug({
      baseDir: config.directories.src.markup,
      locals: {
        icon: name => fs.readFileSync(`./src/assets/icons/${name}.svg`),
        production
      }
    })).on('error', config.onError)
    .pipe($.posthtml(POSTHTML_PLUGINS))
    .pipe($.htmlPrettify())
    .pipe(gulp.dest(config.directories.dist.markup))
)
