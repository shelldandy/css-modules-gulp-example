const gulp = require('gulp')
const config = require('../config')
const when = require('gulp-if')
const $ = require('gulp-load-plugins')()
const production = config.production

gulp.task('purify', () =>
  gulp.src(config.directories.dist.styles + '*.css')
    .pipe(when(production, $.purifycss(config.purify, { info: true })))
    .pipe(gulp.dist(config.directories.dist.style))
)
