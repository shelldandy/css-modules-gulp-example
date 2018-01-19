import App from './app'
import registerServiceWorker from './registerServiceWorker'

App()

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    NextApp()
  })
}

// Optional Service Worker for offline cache
registerServiceWorker()
