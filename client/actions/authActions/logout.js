import {
  LOGOUT_SUCCESS,
} from '../actionTypes';

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutAUser = () => (dispatch) => {
  localStorage.removeItem('BAMtoken');
  dispatch(logoutSuccess());
};
