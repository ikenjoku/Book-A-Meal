import axios from 'axios';
import { browserHistory } from "react-router-dom";

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  }
};




export const logout = () => {
  window.localStorage.removeItem('token');
  browserHistory.push('/');
}

