import {
  LOGOUT_SUCCESS,
} from '../actionTypes';

// Actions
const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});


// Action Creators
export const logoutAUser = () => (dispatch) => {
  localStorage.removeItem('BAMtoken');
  dispatch(logoutSuccess());
};
