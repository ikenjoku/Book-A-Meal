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
  <BrowserRouter>
    <div>
      <Switch>
        <Route path='/' exact component={Landing}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/menu' component={Menu}/>
        <Route path='/manage-meals' component={ManageMeals}/>
        <Route path='/order-history' component={OrderHistory}/>
        <Route path='/set-menu' component={SetMenu}/>
      </Switch>
    </div>
  </BrowserRouter>
  
);


export default App;
