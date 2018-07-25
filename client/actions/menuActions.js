import API from '../axiosConfig';
import {
  GET_MENU_SUCCESS, GET_MENU_FAILURE,
} from './actionTypes';

const getMenuSuccess = selectedMenu => ({
  type: GET_MENU_SUCCESS,
  selectedMenu: selectedMenu.menu,
});

const getMenuFailure = error => ({
  type: GET_MENU_FAILURE,
  error,
});

export const getAMenu = ({ selectedDate }) => (dispatch) => {
  API.get(`/menu?date=${selectedDate}`)
    .then((res) => {
      dispatch(getMenuSuccess(res.data));
      // dispatch notification
    })
    .catch((error) => {
      dispatch(getMenuFailure(error));
    });
};

