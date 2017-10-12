import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './assets/styles/index.css'

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept()
  }
}
