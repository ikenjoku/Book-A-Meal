import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from './NavBar.jsx';
import Menu from './Menu.jsx';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import OrderHistory from './OrderHistory.jsx';
import ManageMeals from './ManageMeals.jsx';
import SetMenu from './SetMenu.jsx';

const App = () => (
  <div>
    <SetMenu/>
  </div>
);


export default App;
