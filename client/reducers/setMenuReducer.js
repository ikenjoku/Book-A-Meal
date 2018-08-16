import {
  SET_MENU_SUCCESS, SET_MENU_FAILURE, SET_SELECTED_DATE,
  ADD_MEAL_TO_MENU_SUCCESS, ADD_MEAL_TO_MENU_FAILURE,
  GET_PAGINATED_MEALS, GET_MEALS_FAILURE,
  GET_MEALS_LOADING_STATUS,
} from '../actions/actionTypes';
import initialState from '../reducers/initialState';


const setMenuReducer = (state = initialState.setMenuReducer, action) => {
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
    case GET_PAGINATED_MEALS:
      return { ...state, paginatedMeals: action.meals, count: action.count, pages: action.pages };
    case GET_MEALS_FAILURE:
      return { ...state, error: action.error };
    case GET_MEALS_LOADING_STATUS:
      return { ...state, isLoading: action.status };
    default:
      return {
        ...state,
      };
  }
};

export default setMenuReducer;
