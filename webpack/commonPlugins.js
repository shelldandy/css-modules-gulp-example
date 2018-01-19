const webpack = require('webpack')

let common = [
  // Allow everyone to use jQuery like it was global
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    // Popper is for Bootstrap 4 mainly
    Popper: ['popper.js', 'default']
  }),
  // Do NOT import the BLOAT from moment.js
  // thanks create-react-app
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]

module.exports = common
