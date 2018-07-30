import API from '../axiosConfig';
import notify from './notify';
import {
  SET_MENU_SUCCESS, SET_MENU_FAILURE,
  SET_SELECTED_DATE, ADD_MEAL_TO_MENU_FAILURE,
  ADD_MEAL_TO_MENU_SUCCESS, GET_PAGINATED_MEALS, 
  GET_MEALS_LOADING_STATUS, GET_MEALS_FAILURE } from './actionTypes';

const setMenu = createdMenu => ({
  type: SET_MENU_SUCCESS,
  createdMenu,
});

const setMenuFailure = error => ({
  type: SET_MENU_FAILURE,
  error,
});

export const setSelectedDate = selectedDate => ({
  type: SET_SELECTED_DATE,
  selectedDate,
});

export const addMealToMenuSuccess = ({ updatedMenu }) => ({
  type: ADD_MEAL_TO_MENU_SUCCESS,
  updatedMenu,
});

export const addMealToMenuFailure = error => ({
  type: ADD_MEAL_TO_MENU_FAILURE,
  error,
});

const getPageMeals = ({meals, count, pages}) => ({
  type: GET_PAGINATED_MEALS,
  meals,
  count,
  pages
});

const getMealsLoadingStatus = status => ({
  type: GET_MEALS_LOADING_STATUS,
  status,
});

const getMealsFailure = error => ({
  type: GET_MEALS_FAILURE,
  error,
});


export const setAMenu = ({ selectedDate }) => (dispatch) => {
  API.post('/menu', { date: selectedDate })
    .then((res) => {
      dispatch(setMenu(res.data));
      notify.success('New Menu Created');
    })
    .catch((error) => {
      dispatch(setMenuFailure(error));
      notify.error(error.message);
    });
};

export const addAMealToMenu = ({ date, mealId }) => (dispatch) => {
  API.post('/menu', { date, mealId })
    .then((res) => {
      dispatch(addMealToMenuSuccess(res.data));
      notify.success('Meal successfully added to menu');
    })
    .catch((error) => {
      dispatch(addMealToMenuFailure(error));
      notify.error(error.message);
    });
};

export const getPaginatedMeals = (page) => (dispatch) => {
  dispatch(getMealsLoadingStatus(true));
  API.get(`/meals/${page}`)
    .then((res) => {
      dispatch(getPageMeals(res.data));
      dispatch(getMealsLoadingStatus(false));
    })
    .catch((err) => {
      dispatch(getMealsFailure(err));
      // dispatch(getMealsLoadingStatus(false));
    });
};