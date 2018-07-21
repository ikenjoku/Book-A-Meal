import React from 'react';
import jwtDecode from 'jwt-decode';
import { loginSuccess, isLoggedIn } from './actions/authActions/login';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { setAuthorizationToken } from './utils/authHelpers';
import store from './store/configureStore';
import App from './components/App';
import './static/styles.scss';

if(localStorage.BAMtoken){
  const decodedUser = jwtDecode(localStorage.BAMtoken);
  setAuthorizationToken(localStorage.BAMtoken);
  store.dispatch(loginSuccess({
    email:decodedUser.email,
    id: decodedUser.id,
    isAdmin: decodedUser.isAdmin,
  }));
  store.dispatch(isLoggedIn(true));
}

const appRoot = (
  <Provider store={store}>
    <App/>
  </Provider>
);

render(appRoot, document.getElementById('app'));
