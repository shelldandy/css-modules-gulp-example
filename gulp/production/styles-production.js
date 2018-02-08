const gulp = require('gulp')
const config = require('../config')
const styles = require('@pixel2html/pipes').styles

gulp.task('main:styles:prod', () =>
  gulp.src(config.project.cssFiles)
    .pipe(styles({
      modules: true,
      name: 'main.css',
      production: config.production
    })())
    .pipe(gulp.dest(config.directories.dist.styles))
)

gulp.task('styles:prod', gulp.series('main:styles:prod', 'writeModules'))
