import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const initialState = {}
const logger = () => window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
let compo
if (logger()) {
  compo = compose(applyMiddleware(thunk), logger())
} else {
  compo = compose(applyMiddleware(thunk))
}
export default createStore(reducers, initialState, compo)