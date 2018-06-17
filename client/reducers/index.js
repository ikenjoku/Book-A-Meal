import { combineReducers } from 'redux';
import mealReducer from './mealReducer';
import menuReducer from './menuReducer';


export default combineReducers({
  mealReducer,
  menuReducer,
});
