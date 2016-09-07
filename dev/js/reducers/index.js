console.log("log reducers/index.js");
import { combineReducers } from 'redux'
import game from './game'

const rootReducer = combineReducers({
  game
})
console.log("log reducers/index.js 8",rootReducer);

export default rootReducer
