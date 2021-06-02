// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout' 
import jobData from './job'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  jobData
})

export default rootReducer
