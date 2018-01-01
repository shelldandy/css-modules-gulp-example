'use strict'
// We use this to read flags in the command line
const argv = require('yargs').argv
const { env } = require('process')
// Add your conditions here 💅
const production = !!argv.prod || !!argv.production || env.NODE_ENV === 'production'
const debug = !!argv.debug || env.NODE_ENV === 'debug'

module.exports = {
  directories: {
    src: {
      base: 'src',
      markup: 'src/pug',
      fonts: 'src/assets/fonts',
      icons: 'src/assets/icons',
      images: 'src/assets/images',
      scripts: 'src/assets/js',
      styles: 'src/assets/styles',
      cssModules: 'src/assets/js/cssModules'
    },
    dist: {
      base: 'dist',
      markup: 'dist',
      fonts: 'dist/assets/fonts',
      icons: 'dist/assets/icons',
      images: 'dist/assets/images',
      scripts: 'dist/assets/js',
      styles: 'dist/assets/css'
    }
  },
  project: {
    cssMainFile: 'src/assets/styles/main/**/!(_)*.scss',
    cssVendorFile: 'src/assets/styles/vendor.scss',
    jsMainFile: 'src/assets/js/main.js',
    fontFiles: [
      'src/assets/fonts/**/*'

    ]
  },
  onError: function (error) {
    console.log(error.toString())
    this.emit('end')
  },
  production,
  debug,
  // Stuff for PurifyCss
  purify: ['./dist/**/*.js', './dist/**/*.html'],
  deploy: {
    ftp: {
      user: '',
      password: '',
      host: '',
      port: '21',
      remotePath: './'
    }
  },
  // For autoprefixer
  browsers: [
    'last 2 Chrome versions',
    'last 2 ChromeAndroid versions',
    'last 2 Firefox versions',
    'last 2 Safari versions',
    'last 2 ios versions',
    'last 1 ie versions',
    'last 2 Edge versions',
    'last 2 Opera versions'
  ]
}
