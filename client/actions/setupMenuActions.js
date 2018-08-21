import API from '../axiosConfig';
import notify from './notify';
import {
  GET_MENU_SUCCESS, GET_MENU_FAILURE,
  GET_MENU_LOADING_STATUS, SET_MENU_SUCCESS,
  SET_MENU_FAILURE, UPDATE_MENU_SUCCESS,
  UPDATE_MENU_FAILURE, GET_MEALS_SUCCESS,
  GET_MEALS_FAILURE, UPDATE_MENU_LOADING_STATUS,
  CREATE_MENU_LOADING_STATUS, GET_MEALS_LOADING_STATUS,
} from './actionTypes';

const getMenu = currentMenu => ({
  type: GET_MENU_SUCCESS,
  currentMenu,
});

const getMenuFailure = error => ({
  type: GET_MENU_FAILURE,
  error,
});


const setMenu = currentMenu => ({
  type: SET_MENU_SUCCESS,
  currentMenu,
});

const setMenuFailure = error => ({
  type: SET_MENU_FAILURE,
  error,
});


const updateMenu = currentMenu => ({
  type: UPDATE_MENU_SUCCESS,
  currentMenu,
});

const updateMenuFailure = error => ({
  type: UPDATE_MENU_FAILURE,
  error,
});

const getMeals = meals => ({
  type: GET_MEALS_SUCCESS,
  meals,
});

const getMealsFailure = error => ({
  type: GET_MEALS_FAILURE,
  error,
});


const isLoadingMenu = status => ({
  type: GET_MENU_LOADING_STATUS,
  status,
});

const isFetching = status => ({
  type: GET_MEALS_LOADING_STATUS,
  status,
});

const isCreating = status => ({
  type: CREATE_MENU_LOADING_STATUS,
  status,
});

const isUpdating = status => ({
  type: UPDATE_MENU_LOADING_STATUS,
  status,
});

export const getAMenu = ({ selectedDate }) => (dispatch) => {
  dispatch(isLoadingMenu(true));
  API.get(`/menu?date=${selectedDate}`)
    .then((res) => {
      dispatch(getMenu(res.data.menu));
      dispatch(isLoadingMenu(false));
    })
    .catch((error) => {
      dispatch(getMenuFailure(error));
      dispatch(getMenu({}));
      dispatch(isLoadingMenu(false));
    });
};

export const setAMenu = ({ date, mealIds }) => (dispatch) => {
  dispatch(isCreating(true));
  API.post('/menu', { date, mealIds })
    .then((res) => {
      dispatch(setMenu(res.data.menu));
      dispatch(isCreating(false));
    })
    .catch((error) => {
      dispatch(setMenuFailure(error));
      dispatch(isCreating(false));
    });
};

export const updateAMenu = ({ id, mealIds }) => (dispatch) => {
  dispatch(isUpdating(true));
  API.put(`/menu/${id}`, { mealIds })
    .then((res) => {
      dispatch(updateMenu(res.data.menu));
      dispatch(isUpdating(false));
    })
    .catch((error) => {
      dispatch(updateMenuFailure(error));
      dispatch(isUpdating(false));
    });
};

export const getAMeals = () => (dispatch) => {
  dispatch(isFetching(true));
  API.get('/meals')
    .then((res) => {
      dispatch(getMeals(res.data.meals));
      dispatch(isFetching(false));
    })
    .catch((error) => {
      dispatch(getMealsFailure(error));
      dispatch(isUpdating(false));
    });
};
