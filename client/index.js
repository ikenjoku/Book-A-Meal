import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from "react-redux";
// import configureStore from './store/configureStore';
import store from './store/configureStore';
import App from './components/App';
import './static/styles.scss';
import { getAllMeals } from "./actions/mealActions";


// const store = configureStore();

store.dispatch(getAllMeals());

const jsx = (
  <Provider store={store}>
    <App/>
  </Provider>
);

render(jsx, document.getElementById('app'));
