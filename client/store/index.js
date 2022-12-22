import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import authReducer from './auth'
import commentaryReducer from './commentary'

const rootReducer = combineReducers({
  auth: authReducer,
  commentary: commentaryReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)

export default store
