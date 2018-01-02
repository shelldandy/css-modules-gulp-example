import App from './app'

App()

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    NextApp()
  })
}
