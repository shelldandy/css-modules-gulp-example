import App from './app'
import registerServiceWorker from './registerServiceWorker'

App()

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}
