import API from '../axiosConfig';
import notify from './notify';
import {
  FETCH_MENU_SUCCESS, FETCH_MENU_FAILURE,
  GET_MENU_LOADING_STATUS, SET_MENU_SUCCESS,
  SET_MENU_FAILURE, UPDATE_MENU_SUCCESS,
  UPDATE_MENU_FAILURE, GET_MEALS_SUCCESS,
  GET_MEALS_FAILURE, UPDATE_MENU_LOADING_STATUS,
  CREATE_MENU_LOADING_STATUS, GET_MEALS_LOADING_STATUS,
  SET_SELECTED_DATE,
} from './actionTypes';

const getMenu = currentMenu => ({
  type: FETCH_MENU_SUCCESS,
  currentMenu,
});

const getMenuFailure = error => ({
  type: FETCH_MENU_FAILURE,
  error,
});

export const setSelectedDate = ({ selectedDate }) => ({
  type: SET_SELECTED_DATE,
  selectedDate,
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

const getMeals = ({ meals, count, pages }) => ({
  type: GET_MEALS_SUCCESS,
  meals: meals.rows,
  count,
  pages,
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
      notify.success(res.data.message);
      dispatch(setMenu(res.data.menu));
      dispatch(isCreating(false));
    })
    .catch((error) => {
      dispatch(setMenuFailure(error));
      dispatch(isCreating(false));
      notify.error(error.response.data.message);
    });
};

export const updateAMenu = ({ mealIds }, id) => (dispatch) => {
  dispatch(isUpdating(true));
  API.put(`/menu/${id}`, { mealIds })
    .then((res) => {
      notify.success(res.data.message);
      dispatch(updateMenu(res.data.menu));
      dispatch(isUpdating(false));
    })
    .catch((error) => {
      dispatch(updateMenuFailure(error));
      dispatch(isUpdating(false));
      notify.error(error.response.data.message);
    });
};

export const getAMeals = ({ limit, page }) => (dispatch) => {
  dispatch(isFetching(true));
  API.get(`/meals?limit=${limit}&page=${page}`)
    .then((res) => {
      dispatch(getMeals(res.data));
      dispatch(isFetching(false));
    })
    .catch((error) => {
      dispatch(getMealsFailure(error));
      dispatch(isFetching(false));
    });
};
