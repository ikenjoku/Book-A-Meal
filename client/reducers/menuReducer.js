import {
  SET_MENU_SUCCESS, SET_MENU_FAILURE, SET_SELECTED_DATE,
} from '../actions/actionTypes';

const initialState = {
  createdMenu: null,
  selectedDate: '',
  error: null,
  success: false,
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU_SUCCESS:
      return {
        ...state,
        createdMenu: action.createdMenu.newMenu,
        selectedDate: action.createdMenu.newMenu.date,
        success: true,
      };
    case SET_MENU_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.selectedDate,
      };
    default:
      return {
        ...state,
      };
  }
};

export default menuReducer;

// HAVE SELECTED DATE...onChange dispatches selected menu/date.. add to menu picks selected plus meal id.....created action also sets selected prpoerty of state