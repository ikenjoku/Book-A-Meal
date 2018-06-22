import {
  AUTH_LOADING, AUTH_LOGIN_STATUS, LOGIN_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  authLoading: true,
  user: {},
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
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
