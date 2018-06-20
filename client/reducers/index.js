import { combineReducers } from 'redux';
import mealReducer from './mealReducer';
import setMenuReducer from './setMenuReducer';
import menuReducer from './menuReducer';


export default combineReducers({
  mealReducer,
  setMenuReducer,
  menuReducer,
});
