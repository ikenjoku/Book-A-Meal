import notify from './notify';
import API from '../axiosConfig';
import {
  GET_MEALS_SUCCESS, GET_MEALS_FAILURE,
  ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE,
  UPDATE_MEAL_SUCCESS, UPDATE_MEAL_FAILURE,
  REMOVE_MEAL_SUCCESS, REMOVE_MEAL_FAILURE,
  GET_MEALS_LOADING_STATUS, GET_PAGINATED_MEALS,
} from './actionTypes';

const getMeals = meals => ({
  type: GET_MEALS_SUCCESS,
  meals,
});

const getPageMeals = ({ meals, count, pages }) => ({
  type: GET_PAGINATED_MEALS,
  meals,
  count,
  pages,
});

const getMealsFailure = error => ({
  type: GET_MEALS_FAILURE,
  error,
});

const getMealsLoadingStatus = status => ({
  type: GET_MEALS_LOADING_STATUS,
  status,
});

const addMeal = meal => ({
  type: ADD_MEAL_SUCCESS,
  meal: meal.meal,
});

const addMealFailure = error => ({
  type: ADD_MEAL_FAILURE,
  error,
});


const updateMeal = ({ id, updatedMeal }) => ({
  type: UPDATE_MEAL_SUCCESS,
  id,
  updatedMeal,
});

const updateMealFailure = error => ({
  type: UPDATE_MEAL_FAILURE,
  error,
});

const removeMeal = ({ id }) => ({
  type: REMOVE_MEAL_SUCCESS,
  id,
});

const removeMealFailure = error => ({
  type: REMOVE_MEAL_FAILURE,
  error,
});


const getPaginatedMeals = page => (dispatch) => {
  dispatch(getMealsLoadingStatus(true));
  API.get(`/meals?page=${page}`)
    .then((res) => {
      dispatch(getPageMeals(res.data));
      dispatch(getMealsLoadingStatus(false));
    })
    .catch((err) => {
      dispatch(getMealsFailure(err));
      dispatch(getMealsLoadingStatus(false));
    });
};

const addAMeal = mealData => (dispatch) => {
  API.post('/meals', mealData)
    .then((res) => {
      dispatch(addMeal({ meal: res.data.meal }));
      notify.success(res.data.message);
    })
    .catch((error) => {
      dispatch(addMealFailure(error));
      notify.error(error.response.data.message);
    });
};

const updateAMeal = (id, updates) => (dispatch) => {
  API.put(`/meals/${id}`, updates)
    .then((res) => {
      dispatch(updateMeal({ id, updatedMeal: res.data.updatedMeal }));
      notify.success(res.data.message);
    })
    .catch((error) => {
      dispatch(updateMealFailure(error));
      notify.error(error.response.data.message);
    });
};

const removeAMeal = ({ id }) => (dispatch) => {
  API.delete(`/meals/${id}`)
    .then((res) => {
      dispatch(removeMeal({ id }));
      notify.success(res.data.message);
    })
    .catch((error) => {
      dispatch(removeMealFailure(error));
      notify.error(error.response.data.message);
    });
};


export {
  getPaginatedMeals,
  addAMeal,
  updateAMeal,
  removeAMeal,
};
