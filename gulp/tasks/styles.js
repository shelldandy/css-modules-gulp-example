const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()
const moduleImporter = require('sass-module-importer')
const postCssPlugins = require('./postCssPlugins')

gulp.task('main:styles', done => {
  gulp.src(config.project.cssFiles)
    .pipe($.sass({importer: moduleImporter()}))
    .on('error', config.onError)
    .pipe($.postcss(postCssPlugins.plugins))
    .pipe($.groupCssMediaQueries())
    .pipe($.csscomb())
    .pipe($.concat('main.css'))
    .pipe(gulp.dest(config.directories.dist.styles))
  done()
})

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
