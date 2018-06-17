import API from '../axiosConfig';
import {
  SET_MENU_SUCCESS, SET_MENU_FAILURE,
  SET_SELECTED_DATE,
} from './actionTypes';

// Actions

const setMenu = createdMenu => ({
  type: SET_MENU_SUCCESS,
  createdMenu,
});

export const setSelectedDate = selectedDate => ({
  type: SET_SELECTED_DATE,
  selectedDate,
});

// const setMenuFormattedDate = formattedDate => ({
//   type: SET_MENU_SUCCESS,
//   formattedDate,
// });

const setMenuFailure = error => ({
  type: SET_MENU_FAILURE,
  error,
});

// Action Creators
const setAMenu = ({ selectedDate, formattedDate }) => (dispatch) => {
  API.post('/menu', { date: selectedDate })
    .then((res) => {
      dispatch(setMenu(res.data));
      // dispatch(setMenuFormattedDate(formattedDate));
    })
    .catch((error) => {
      dispatch(setMenuFailure(error));
    });
};

export default setAMenu;
// make an action to dispatch meal id with selected menu date