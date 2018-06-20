import API from '../axiosConfig';
import {
  GET_MENU_SUCCESS, GET_MENU_FAILURE,
} from './actionTypes';

// Actions

const getMenuSuccess = selectedMenu => ({
  type: GET_MENU_SUCCESS,
  selectedMenu: selectedMenu.menu,
});

const getMenuFailure = error => ({
  type: GET_MENU_FAILURE,
  error,
});




// Action Creators
export const getAMenu = ({ selectedDate }) => (dispatch) => {
  API.get(`/menu?date=${selectedDate}`)
    .then((res) => {
      dispatch(getMenuSuccess(res.data));
      console.log(res.data);
      // dispatch notification
    })
    .catch((error) => {
      dispatch(getMenuFailure(error));
    });
};

