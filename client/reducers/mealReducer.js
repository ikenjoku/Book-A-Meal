import {
  GET_MEALS_SUCCESS, GET_MEALS_FAILURE,
  ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE,
  UPDATE_MEAL_SUCCESS, UPDATE_MEAL_FAILURE,
  REMOVE_MEAL_SUCCESS, REMOVE_MEAL_FAILURE,
  GET_MEALS_LOADING_STATUS, GET_PAGINATED_MEALS,
} from '../actions/actionTypes';
import initialState from './initialState';


// MEAL REDUCER
export default (state = initialState.mealReducer, action) => {
  let meals;
  switch (action.type) {
    case GET_MEALS_SUCCESS:
      return { ...state, meals: action.meals };
    case GET_PAGINATED_MEALS:
      return { ...state, paginatedMeals: action.meals, count: action.count, pages: action.pages };
    case GET_MEALS_FAILURE:
      return { ...state, error: action.error };
    case GET_MEALS_LOADING_STATUS:
      return { ...state, isLoading: action.status };
    case ADD_MEAL_SUCCESS:
      return { ...state, paginatedMeals: [...state.paginatedMeals, action.meal] };
    case ADD_MEAL_FAILURE:
      return { ...state, error: action.error };
    case UPDATE_MEAL_SUCCESS:
      meals = state.paginatedMeals.filter(meal => meal.id !== action.id);
      return { ...state, paginatedMeals: [...meals, action.updatedMeal] };
    case UPDATE_MEAL_FAILURE:
      return { ...state, error: action.error };
    case REMOVE_MEAL_SUCCESS:
      return {
        ...state, paginatedMeals: state.paginatedMeals.filter(meal => meal.id !== action.id),
      };
    case REMOVE_MEAL_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
