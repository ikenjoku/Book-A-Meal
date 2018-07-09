import notify from '../notify';
import API from '../../axiosConfig';
import {
  LOGIN_SUCCESS, AUTH_LOADING, AUTH_LOGIN_STATUS, LOGIN_FAILURE,
} from '../actionTypes';
import { setAuthorizationToken } from '../../utils/authHelpers';

// Actions
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const isLoggedIn = status => ({
  type: AUTH_LOGIN_STATUS,
  isLoggedIn: status,
});

export const isLoading = status => ({
  type: AUTH_LOADING,
  isLoading: status,
});

// Action Creators
export const loginAUser = loginData => (dispatch) => {
  dispatch(isLoading(true));
  return API.post('/auth/login', loginData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('BAMtoken', token);
      setAuthorizationToken(token);
      dispatch(loginSuccess(res.data));
      dispatch(isLoggedIn(true));
      dispatch(isLoading(false));
      notify.success(res.data.message);
      return res.data;
    })
    .catch((error) => {
      dispatch(loginFailure(error));
      notify.error(error.response.data.message);
    });
};

// export const notifyUser = msg => (dispatch) => {
//   dispatch(loginFailure({ message: 'Please login' }));
//   notify.error(msg);
// };
