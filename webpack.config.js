const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = require('./gulp/config')
const {cwd} = require('process')

const production = config.production
const debug = config.debug
const WebpackMonitor = require('webpack-monitor')

// When you really want to make the relationship work...
const ENTRY_PATH = cwd() + '/' + config.project.jsMainFile
const OUTPUT_PATH = cwd() + '/' + config.directories.dist.scripts

let plugins = [
  // Allow everyone to use jQuery like it was global
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => /node_modules/.test(module.resource)
  }),
  // Do NOT import the BLOAT from moment.js
  // thanks create-react-app
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]
const devPlugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
]
const productionPlugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.DefinePlugin({
    'process.env': { 'NODE_ENV': JSON.stringify('production') }
  }),
  new UglifyJSPlugin({sourceMap: true})
]
const debugPlugins = [
  new BundleAnalyzerPlugin(),
  new WebpackMonitor({
    target: cwd() + '/gulp/stats.json',
    launch: true,
    port: 5000
  })
]

if (!production) plugins = [...plugins, ...devPlugins]
if (production) plugins = [...plugins, ...productionPlugins]
if (debug) plugins = [...plugins, ...debugPlugins]

const CONFIG = {
  entry: production ? {
    main: ENTRY_PATH
  } : {
    main: [
      ENTRY_PATH,
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    ]
  },
  devtool: production ? 'source-map' : 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            require.resolve('@pixel2html/babel-preset')
          ]
        }
      }
    }]},
  output: {
    filename: production ? '[name].min.js' : '[name].js',
    path: OUTPUT_PATH,
    publicPath: '/'
  },
  plugins,
  externals: production ? {
    jquery: 'jQuery'
  } : {},
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

module.exports = CONFIG
