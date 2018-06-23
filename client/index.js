import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import store from './store/configureStore';
import App from './components/App';
import './static/styles.scss';


const appRoot = (
  <Provider store={store}>
    <App/>
  </Provider>
);

render(appRoot, document.getElementById('app'));
