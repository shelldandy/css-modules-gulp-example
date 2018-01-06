const gulp = require('gulp')
const config = require('../config')
const browserSync = require('browser-sync')
const openBrowser = require('react-dev-utils/openBrowser')
const WebpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils')
const {prepareUrls, choosePort} = WebpackDevServerUtils
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const DEFAULT_PORT = 3000
const HOST = '0.0.0.0'
const protocol = 'https'
const fakeCert = require('create-cert-files')()
const bundler = webpack(webpackConfig)

gulp.task('browser-sync', done => {
  choosePort(HOST, DEFAULT_PORT)
    .then(port => {
      if (port === null) {
        return
      }
      const urls = prepareUrls(protocol, HOST, port)
      browserSync.init({
        port,
        server: {
          baseDir: config.directories.dist.base,
          serveStaticOptions: {
            extensions: ['html']
          }
        },
        open: false,
        logConnections: true,
        logPrefix: 'Pixel2Html',
        https: {
          key: fakeCert.key,
          cert: fakeCert.cert
        },
        middleware: [
          webpackDevMiddleware(bundler, {
            publicPath: webpackConfig.output.publicPath,
            stats: { colors: true },
            headers: { 'Access-Control-Allow-Origin': '*' }
          }),
          webpackHotMiddleware(bundler)
        ],
        files: [
          '**/*.css'
        ]
      })
      openBrowser(urls.localUrlForBrowser)
      done()
    })
})
