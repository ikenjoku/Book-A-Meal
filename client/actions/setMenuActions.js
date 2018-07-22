import API from '../axiosConfig';
import notify from './notify';
import {
  SET_MENU_SUCCESS, SET_MENU_FAILURE,
  SET_SELECTED_DATE, ADD_MEAL_TO_MENU_FAILURE,
  ADD_MEAL_TO_MENU_SUCCESS } from './actionTypes';

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
