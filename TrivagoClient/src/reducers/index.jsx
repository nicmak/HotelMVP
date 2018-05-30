import { combineReducers } from 'redux'
import { exampleReducer } from './exampleReducer'
import { hotelReducer } from './hotelsReducer'
import { filterReducer } from './filterReducer'


export default combineReducers({
  exampleReducer,
  hotelReducer,
  filterReducer
})
