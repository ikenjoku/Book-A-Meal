import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from './NavBar/NavBar.jsx';
import Landing from './Landing.jsx';
import Footer from './Footer.jsx';
import Menu from './Menu/Menu.jsx';
import Login from './Auth/Login.jsx';
import Signup from './Auth/Signup.jsx';
import OrderHistory from './OrderHistory/OrderHistory.jsx';
import ManageMeals from './ManageMeals/ManageMeals.jsx';
import SetMenu from './SetMenu/SetMenu.jsx';

const App = () => (
  <BrowserRouter>
    <div className='app-container'>
      <NavBar />
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/menu' component={Menu} />
          <Route path='/manage-meals' component={ManageMeals} />
          <Route path='/order-history' component={OrderHistory} />
          <Route path='/set-menu' component={SetMenu} />
        </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
