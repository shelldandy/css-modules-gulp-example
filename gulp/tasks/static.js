const gulp = require('gulp')
const config = require('../config')
const del = require('del')

gulp.task('clean', () =>
  del([
    config.directories.dist.base,
    config.directories.src.cssModules
  ])
)

gulp.task('images', () =>
  gulp.src(config.directories.src.images + '/**/*')
    .pipe(gulp.dest(config.directories.dist.images))
)
