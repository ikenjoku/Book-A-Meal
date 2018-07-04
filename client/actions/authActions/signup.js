import API from '../../axiosConfig';
import {
  SIGNUP_SUCCESS,
} from '../actionTypes';
// Actions

const signUpSuccess = user => ({
  type: SIGNUP_SUCCESS,
  user,
});


// Action Creators
export const signupAUser = signupData => dispatch =>
  // dispatch loading
  API.post('/auth/signup', signupData)
    .then((res) => {
      dispatch(signUpSuccess(res.data));
      return res.data;
    })
    .catch((error) => {
    // error
    });

