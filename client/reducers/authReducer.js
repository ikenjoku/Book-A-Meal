import {
  AUTH_LOADING, AUTH_LOGIN_STATUS,
  LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_FAILURE, SIGNUP_SUCCESS,
} from '../actions/actionTypes';
import initialState from './initialState';

const authReducer = (state = initialState.authReducer, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: action.isLoading,
      };
    case AUTH_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
};


export default authReducer;
