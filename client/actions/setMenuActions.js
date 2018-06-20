import API from '../axiosConfig';
import {
  SET_MENU_SUCCESS, SET_MENU_FAILURE,
  SET_SELECTED_DATE,
  ADD_MEAL_TO_MENU_FAILURE, ADD_MEAL_TO_MENU_SUCCESS,
} from './actionTypes';

// Actions

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

export const addMealToMenuSuccess = ({message, updatedMenu}) => ({
  type: ADD_MEAL_TO_MENU_SUCCESS,
  updatedMenu,
});

export const addMealToMenuFailure = ({error}) => ({
  type: ADD_MEAL_TO_MENU_SUCCESS,
  updatedMenu,
});
// const setMenuFormattedDate = formattedDate => ({
//   type: SET_MENU_SUCCESS,
//   formattedDate,
// });


// Action Creators
export const setAMenu = ({ selectedDate, formattedDate }) => (dispatch) => {
  API.post('/menu', { date: selectedDate })
    .then((res) => {
      dispatch(setMenu(res.data));
      // dispatch(setMenuFormattedDate(formattedDate));
    })
    .catch((error) => {
      dispatch(setMenuFailure(error));
    });
};

export const addAMealToMenu = ({date, mealId}) => (dispatch) => {
  API.post('/menu', { date, mealId })
  .then((res) => {
    dispatch(addMealToMenuSuccess(res.data));
    //dispatch a notify toast
    // dispatch(setMenuFormattedDate(formattedDate));
  })
  .catch((error) => {
    dispatch(addMealToMenuFailure(error));
  });
}
// make an action to dispatch meal id with selected menu date