const config = require('./gulp/config')
const gulp = require('gulp')

const common = [
  'cssModulesWrite',
  'fonts',
  'markup',
  'scripts',
  'static',
  'styles'
]

const development = [
  'serve',
  'watch'
]

const production = [
  'critical',
  'minifyStyles',
  'purify',
  'styles-production',
  'zip'
]

common.forEach(file => require(`./gulp/common/${file}`))

let tasks = [
  'clean',
  config.production ? 'styles:prod' : 'styles',
  'images',
  'head',
  'scripts',
  'fonts',
  'markup'
]

if (config.production) {
  tasks.push(
    'minifyStyles',
    'purify',
    'critical'
  )
}

gulp.task('build', gulp.series(...tasks))

if (config.production) {
  production.forEach(file => require(`./gulp/production/${file}`))
  gulp.task('release', gulp.series('build', 'zip'))
} else {
  development.forEach(file => require(`./gulp/development/${file}`))
  gulp.task('serve', gulp.parallel('browser-sync', 'watch'))
  gulp.task('default', gulp.series('build', 'serve'))
}
