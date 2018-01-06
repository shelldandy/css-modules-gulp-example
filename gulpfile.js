var requireDir = require('require-dir')
var gulp = require('gulp')

// Add all the tasks and files, boom!
requireDir('gulp', {
  recurse: true
})

gulp.task('build', gulp.series(
  'clean',
  'styles',
  'images',
  'scripts',
  'fonts',
  'markup'
))

gulp.task('serve', gulp.parallel('browser-sync', 'watch'))
gulp.task('release', gulp.series('build', 'zip'))
gulp.task('default', gulp.series('build', 'serve'))
