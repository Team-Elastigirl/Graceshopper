import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productsReducer from './products'
import singleProductReducer from './singleProduct'

const reducer = combineReducers({
  products: productsReducer,
  singleProduct: singleProductReducer,
  user
})
//add subreducers as needed above ie products/singleProduct/singleUser/Guest(maybe?)
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './singleProduct'
