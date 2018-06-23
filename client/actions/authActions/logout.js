import API from '../../axiosConfig';
import {
  LOGOUT_SUCCESS,
} from '../actionTypes';

// Actions
const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});


// Action Creators
export const logoutAUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logoutSuccess());
};
