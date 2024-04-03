import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // Correct import statement for thunk
import itemReducer from './reducers/itemReducer';

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  itemReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

export default store;