import {
  GET_MENU_SUCCESS, GET_MENU_FAILURE,
} from '../actions/actionTypes';
import initialState from './initialState';


const menuReducer = (state = initialState.menuReducer, action) => {
  switch (action.type) {
    case GET_MENU_SUCCESS:
      return {
        ...state,
        selectedMenu: action.selectedMenu,
        error: null,
      };
    case GET_MENU_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export default menuReducer;
