console.log("log store/configureStore.js");
import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  console.log("log store/configureStore.js 6 ",initialState);
  console.log("log store/configureStore.js 7 ",rootReducer);
  const store = createStore(rootReducer, initialState)
  console.log("log store/configureStore.js 9 store",store);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }


  console.log("log store/configureStore.js initialState 19",initialState);

  console.log("log store/configureStore.js 21 ",store);
  return store
}
