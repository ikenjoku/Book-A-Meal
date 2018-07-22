import API from '../../axiosConfig';
import notify from '../notify';
import {
  SIGNUP_SUCCESS, SIGNUP_FAILURE,
} from '../actionTypes';
import { isLoggedIn, isLoading } from './login';
import { setAuthorizationToken } from '../../utils/authHelpers';

const signUpSuccess = user => ({
  type: SIGNUP_SUCCESS,
  user,
});

const signUpFailure = error => ({
  type: SIGNUP_FAILURE,
  error,
});


export const signupAUser = signupData => (dispatch) => {
  dispatch(isLoading(true));
  API.post('/auth/signup', signupData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('BAMtoken', token);
      setAuthorizationToken(token);
      dispatch(signUpSuccess(res.data));
      dispatch(isLoggedIn(true));
      dispatch(isLoading(false));
      notify.success(res.data.message);
      return res.data;
    })
    .catch((error) => {
      dispatch(signUpFailure(error));
      notify.error(error.response.data.message);
    });
};
