import API from '../axiosConfig';
import {
  GET_MEALS_SUCCESS, GET_MEALS_FAILURE,
  ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE,
  UPDATE_MEAL_SUCCESS, UPDATE_MEAL_FAILURE,
  REMOVE_MEAL_SUCCESS, REMOVE_MEAL_FAILURE,
} from './actionTypes';


// Actions

// Get Meals
const getMeals = meals => ({
  type: GET_MEALS_SUCCESS,
  meals,
});

const getMealsFailure = error => ({
  type: GET_MEALS_FAILURE,
  error,
});

// Add Meal
const addMeal = meal => ({
  type: ADD_MEAL_SUCCESS,
  meal: meal.meal,
});

const addMealFailure = error => ({
  type: ADD_MEAL_FAILURE,
  error,
});

// Update Meal
const updateMeal = ({ id, updatedMeal }) => ({
  type: UPDATE_MEAL_SUCCESS,
  id,
  updatedMeal,
});

const updateMealFailure = error => ({
  type: UPDATE_MEAL_FAILURE,
  error,
});

// Remove Meal
const removeMeal = ({ id }) => ({
  type: REMOVE_MEAL_SUCCESS,
  id,
});

const removeMealFailure = error => ({
  type: REMOVE_MEAL_FAILURE,
  error,
});


// Action Creators

const getAllMeals = () => (dispatch) => {
  API.get('/meals')
    .then((res) => {
      dispatch(getMeals(res.data.meals));
    })
    .catch((err) => {
      dispatch(getMealsFailure(err));
    });
};

const addAMeal = mealData => (dispatch) => {
  API.post('/meals', mealData)
    .then((res) => {
      dispatch(addMeal({
        meal: res.data.meal,
      }));
    })
    .catch((err) => {
      dispatch(addMealFailure(err));
    });
};


const updateAMeal = (id, updates) => (dispatch) => {
  API.put(`/meals/${id}`, updates)
    .then((res) => {
      dispatch(updateMeal({
        id,
        updatedMeal: res.data.updatedMeal,
      }));
    })
    .catch((err) => {
      dispatch(updateMealFailure(err));
    });
};

const removeAMeal = ({ id }) => (dispatch) => {
  API.delete(`/meals/${id}`)
    .then((res) => {
      dispatch(removeMeal({ id }));
    })
    .catch((error) => {
      dispatch(removeMealFailure(error));
    });
};


export {
  getAllMeals,
  addAMeal,
  updateAMeal,
  removeAMeal,
};
