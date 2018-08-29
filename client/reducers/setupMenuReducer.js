import {
  FETCH_MENU_SUCCESS, FETCH_MENU_FAILURE,
  GET_MENU_LOADING_STATUS, SET_MENU_SUCCESS,
  SET_MENU_FAILURE, UPDATE_MENU_SUCCESS,
  UPDATE_MENU_FAILURE, GET_MEALS_SUCCESS,
  GET_MEALS_FAILURE, UPDATE_MENU_LOADING_STATUS,
  CREATE_MENU_LOADING_STATUS, GET_MEALS_LOADING_STATUS,
  SET_SELECTED_DATE,
} from '../actions/actionTypes';
import initialState from '../reducers/initialState';


const setupMenuReducer = (state = initialState.setupMenuReducer, action) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESS:
      return { ...state, currentMenu: action.currentMenu, error: null };
    case FETCH_MENU_FAILURE:
      return { ...state, error: action.error };
    case SET_MENU_SUCCESS:
      return { ...state, currentMenu: action.currentMenu };
    case SET_MENU_FAILURE:
      return { ...state, error: action.error };
    case UPDATE_MENU_SUCCESS:
      return { ...state, currentMenu: action.currentMenu };
    case UPDATE_MENU_FAILURE:
      return { ...state, error: action.error };
    case GET_MEALS_FAILURE:
      return { ...state, error: action.error };
    case GET_MEALS_SUCCESS:
      return { ...state, meals: action.meals, count: action.count, pages: action.pages, error: null };
    case SET_SELECTED_DATE:
      return { ...state, selectedDate: action.selectedDate };
    case GET_MENU_LOADING_STATUS:
      return { ...state, isLoadingMenu: action.status };
    case UPDATE_MENU_LOADING_STATUS:
      return { ...state, isUpdating: action.status };
    case CREATE_MENU_LOADING_STATUS:
      return { ...state, isCreating: action.status };
    case GET_MEALS_LOADING_STATUS:
      return { ...state, isFetching: action.status };
    default:
      return {
        ...state,
      };
  }
};

export default setupMenuReducer;
