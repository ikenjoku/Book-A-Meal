import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router-dom';

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  }
};


export const logout = () => {
  window.localStorage.removeItem('token');
  browserHistory.push('/');
};

export const isExpiredToken = (token) => {
  const { exp } = jwtDecode(token);
  if (Date.now() / 1000 > exp) {
    return false;
  }
  return true;
};
