import API from '../../axiosConfig';
import {
  LOGIN_SUCCESS, AUTH_LOADING, AUTH_LOGIN_STATUS,
} from '../actionTypes';
import { setAuthorizationToken } from '../../utils/authHelpers';
// Actions

const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

const isLoggedIn = status => ({
  type: AUTH_LOGIN_STATUS,
  isLoggedIn: status,
});

const isLoading = status => ({
  type: AUTH_LOADING,
  isLoading: status,
});

// Action Creators
export const loginAUser = loginData => (dispatch) => {
  // dispatch loading
  return API.post('/auth/login', loginData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      dispatch(loginSuccess(res.data));
      dispatch(isLoggedIn(true));
      dispatch(isLoading(false));
      return res.data;
    })
    .catch((error) => {
    // error
    });
};