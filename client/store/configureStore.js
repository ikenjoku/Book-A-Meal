// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import mealReducer from '../reducers/mealReducer';

// CREATE STORE
/* eslint-disable no-underscore-dangle */
// export default () => {
//   const store = createStore(
//     combineReducers({
//       meals: mealReducer,
//     }, applyMiddleware(thunk)),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // );
  /* eslint-enable */

//   return store;
// };


import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducers from '../reducers/index';


const enhancers = [];
let middleware = {};

if (process.env.NODE_ENV === 'development') {
  if (window.devToolsExtension) {
    enhancers.push(devToolsExtension());
  }
  middleware = applyMiddleware(logger, thunk);
} else {
  middleware = applyMiddleware(thunk);
}
const store = createStore(rootReducers, {}, compose(middleware, ...enhancers));

export default store;
