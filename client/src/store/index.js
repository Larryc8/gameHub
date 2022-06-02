
import  {applyMiddleware, combineReducers, createStore} from 'redux'

import thunk from 'redux-thunk'

import * as reducers from '../reducers/index'

const store = createStore(combineReducers(reducers), applyMiddleware(thunk))


export default store;
