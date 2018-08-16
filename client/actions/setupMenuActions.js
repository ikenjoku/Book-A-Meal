import API from '../axiosConfig';
import notify from './notify';
import {
  GET_A_MENU_SUCCESS, GET_A_MENU_FAILURE, GET_MENU_LOADING_STATUS,
} from './actionTypes';

const getMenu = currentMenu => ({
  type: GET_A_MENU_SUCCESS,
  currentMenu,
});

const getMenuFailure = error => ({
  type: GET_A_MENU_FAILURE,
  error,
});

const isLoadingMenu = status => ({
  type: GET_MENU_LOADING_STATUS,
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
