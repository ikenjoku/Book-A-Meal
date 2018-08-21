import { combineReducers } from 'redux';
import mealReducer from './mealReducer';
import setupMenuReducer from './setupMenuReducer';
import menuReducer from './menuReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';
import { LOGOUT_SUCCESS } from '../actions/actionTypes';
import initialState from './initialState';


const baseReducer = combineReducers({
  mealReducer,
  menuReducer,
  orderReducer,
  authReducer,
  setupMenuReducer,
});


const rootReducer = (state, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return baseReducer(state, action);
  }
};

export default rootReducer;
