import API from '../axiosConfig';
import {
  GET_MENU_SUCCESS, GET_MENU_FAILURE,
} from './actionTypes';

const getMenuSuccess = ({ menu }) => ({
  type: GET_MENU_SUCCESS,
  selectedMenu: menu,
});

const getMenuFailure = error => ({
  type: GET_MENU_FAILURE,
  error,
});

export const getAMenu = ({ selectedDate }) => (dispatch) => {
  return API.get(`/menu?date=${selectedDate}`)
    .then((res) => {
      dispatch(getMenuSuccess({ menu: res.data.menu }));
    })
    .catch((error) => {
      dispatch(getMenuFailure(error.response.data));
    });
};

