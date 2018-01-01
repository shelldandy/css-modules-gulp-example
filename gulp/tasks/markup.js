const gulp    = require('gulp')
const config  = require('../config')
const $ = require('gulp-load-plugins')()
const production = config.production
const fs = require('fs')


gulp.task('markup', () =>
  gulp.src(config.directories.src.markup+'/*.pug')
    .pipe($.pug({
      baseDir: config.directories.src.markup,
      locals: {
        icon: name => fs.readFileSync(`./src/assets/icons/${name}.svg`),
        production
      }
    })).on('error', config.onError)
    .pipe($.htmlPrettify())
    .pipe(gulp.dest(config.directories.dist.markup))
)
