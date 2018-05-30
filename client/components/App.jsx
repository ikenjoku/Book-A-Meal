import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from './NavBar.jsx';
import Menu from './Menu.jsx';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const App = () => (
  <div>
    <Menu/>
  </div>
);


export default App;
