import {
  SET_MENU_SUCCESS, SET_MENU_FAILURE, SET_SELECTED_DATE,
  ADD_MEAL_TO_MENU_SUCCESS, ADD_MEAL_TO_MENU_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  createdMenu: null,
  selectedDate: '',
  error: null,
  success: false,
  updatedMenu: null,
};

const setMenuReducer = (state = initialState, action) => {
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
    case ADD_MEAL_TO_MENU_SUCCESS:
      return {
        ...state,
        updatedMenu: action.updatedMenu,
      };
    case ADD_MEAL_TO_MENU_FAILURE:
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

export default setMenuReducer;

// HAVE SELECTED DATE...onChange dispatches selected menu/date.. add to menu picks selected plus meal id.....created action also sets selected prpoerty of state