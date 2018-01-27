import App from './app'
import registerServiceWorker from './registerServiceWorker'

App()

if (module.hot) module.hot.accept('./app', () => App())

// Optional Service Worker for offline cache
registerServiceWorker()
