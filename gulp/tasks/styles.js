const gulp = require('gulp')
const config = require('../config')
const when = require('gulp-if')
const $ = require('gulp-load-plugins')()
const production = config.production
const moduleImporter = require('sass-module-importer')

const POSTCSS_PLUGINS = [
  require('autoprefixer')({
    browsers: config.browsers
  }),
  require('postcss-modules')({
    generateScopedName: production ? '[hash:base64:5]' : '[local]___[hash:base64:5]',
    getJSON: function (cssFileName, json, outputFileName) {
      const fs = require('fs-path')
      const path = require('path')
      const cssName = path.basename(cssFileName, '.css')
      const jsonFileName = path.resolve(`./${config.directories.src.cssModules}/${cssName}.json`)
      fs.writeFileSync(jsonFileName, JSON.stringify(json))
    }
  })
]

gulp.task('main:styles', () =>
  gulp.src(config.project.cssMainFile)
    .pipe(when(!production, $.sourcemaps.init()))
    .pipe($.sass({importer: moduleImporter()}))
    .on('error', $.sass.logError)
    .pipe($.postcss(POSTCSS_PLUGINS))
    .pipe(when(production, $.groupCssMediaQueries()))
    .pipe(when(production, $.csscomb()))
    .pipe($.concat('main.css'))
    .pipe(when(!production, $.sourcemaps.write('./')))
    .pipe(gulp.dest(config.directories.dist.styles))

    .pipe(when(production, $.rename({suffix: '.min'})))
    .pipe(when(production, $.purifycss(config.purify, { info: true })))
    .pipe(when(production, $.cssnano()))
    .pipe(when(production, gulp.dest(config.directories.dist.styles)))
)

gulp.task('vendor:styles', () =>
  gulp.src(config.project.cssVendorFile)
    .pipe(when(!production, $.sourcemaps.init()))
    .pipe($.sass({importer: moduleImporter()}))
    .on('error', $.sass.logError)
    .pipe($.autoprefixer({
      browsers: config.browsers
    }))
    .pipe(when(production, $.groupCssMediaQueries()))
    .pipe(when(production, $.csscomb()))
    .pipe(when(!production, $.sourcemaps.write('./')))
    .pipe(gulp.dest(config.directories.dist.styles))

    .pipe(when(production, $.rename({suffix: '.min'})))
    .pipe(when(production, $.purifycss(config.purify, { info: true })))
    .pipe(when(production, $.cssnano()))
    .pipe(when(production, gulp.dest(config.directories.dist.styles)))
)

gulp.task('styles', gulp.parallel('main:styles', 'vendor:styles'))
