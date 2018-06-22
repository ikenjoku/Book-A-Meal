import { LOGIN_SUCCESS } from '../actionTypes';

export const LoggedIn = urls => ({
  type: LOGIN_SUCCESS,
  urls,
});
