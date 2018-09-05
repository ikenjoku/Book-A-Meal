import notify from './notify';
import API from '../axiosConfig';
import {
  GET_MEALS_FAILURE,
  ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE,
  UPDATE_MEAL_SUCCESS, UPDATE_MEAL_FAILURE,
  REMOVE_MEAL_SUCCESS, REMOVE_MEAL_FAILURE,
  GET_MEALS_LOADING_STATUS, GET_PAGINATED_MEALS,
} from './actionTypes';

export const getPageMeals = ({ meals, count, pages }) => ({
  type: GET_PAGINATED_MEALS,
  meals: meals.rows,
  count,
  pages,
});

export const getMealsFailure = error => ({
  type: GET_MEALS_FAILURE,
  error,
});

export const getMealsLoadingStatus = status => ({
  type: GET_MEALS_LOADING_STATUS,
  status,
});

export const addMeal = meal => ({
  type: ADD_MEAL_SUCCESS,
  meal: meal.meal,
});

export const addMealFailure = error => ({
  type: ADD_MEAL_FAILURE,
  error,
});


export const updateMeal = ({ id, updatedMeal }) => ({
  type: UPDATE_MEAL_SUCCESS,
  id,
  updatedMeal,
});

export const updateMealFailure = error => ({
  type: UPDATE_MEAL_FAILURE,
  error,
});

export const removeMeal = ({ id }) => ({
  type: REMOVE_MEAL_SUCCESS,
  id,
});

export const removeMealFailure = error => ({
  type: REMOVE_MEAL_FAILURE,
  error,
});


export const getPaginatedMeals = ({ limit, page }) => (dispatch) => {
  dispatch(getMealsLoadingStatus(true));
  return API.get(`/meals?limit=${limit}&page=${page}`)
    .then((res) => {
      dispatch(getPageMeals(res.data));
      dispatch(getMealsLoadingStatus(false));
    })
    .catch((error) => {
      dispatch(getMealsFailure(error.response.data));
      dispatch(getMealsLoadingStatus(false));
    });
};

export const addAMeal = mealData => (dispatch) => {
  return API.post('/meals', mealData)
    .then((res) => {
      dispatch(addMeal({ meal: res.data.meal }));
      notify.success(res.data.message);
    })
    .catch((error) => {
      dispatch(addMealFailure(error.response.data));
      notify.error(error.response.data.message);
    });
};

export const updateAMeal = (id, updates) => (dispatch) => {
  return API.put(`/meals/${id}`, updates)
    .then((res) => {
      dispatch(updateMeal({ id, updatedMeal: res.data.updatedMeal }));
      notify.success(res.data.message);
    })
    .catch((error) => {
      dispatch(updateMealFailure(error.response.data));
      notify.error(error.response.data.message);
    });
};

export const removeAMeal = id => (dispatch) => {
  return API.delete(`/meals/${id}`)
    .then((res) => {
      dispatch(removeMeal({ id }));
      notify.success(res.data.message);
    })
    .catch((error) => {
      dispatch(removeMealFailure(error.response.data));
      notify.error(error.response.data.message);
    });
};
