import { combineReducers } from 'redux';
import mealReducer from './mealReducer';
import setMenuReducer from './setMenuReducer';
import menuReducer from './menuReducer';
import orderReducer from "./orderReducer";
import authReducer from './authReducer';
import { LOGOUT_SUCCESS } from "../actions/actionTypes";


const baseReducer =  combineReducers({
  mealReducer,
  setMenuReducer,
  menuReducer,
  orderReducer,
  authReducer,
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