import { combineReducers } from 'redux'
import characters from './characters.js';
import navigation from './navigation.js';

const rootReducer = combineReducers({
  characters,
  navigation,
})

export default rootReducer