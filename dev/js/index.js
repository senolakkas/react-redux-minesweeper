// import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

console.log("log index.js 8 ");


const store = configureStore()
console.log("log index.js 13 ");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
console.log("log index.js 20 ");
