import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from './NavBar/index.jsx';
import Landing from './Landing.jsx';
import Login from './Auth/Login.jsx';
import Signup from './Auth/Signup.jsx';

import MealList from './ManageMeals/MealList.jsx';
import EditMeal from './ManageMeals/EditMealForm.jsx';
import AddMeal from './ManageMeals/AddMealForm.jsx';

import OrderHistory from './OrderHistory/OrderHistory.jsx';

import SetMenu from './SetMenu/SetMenu.jsx';
import Menu from './Menu/Menu.jsx';

import Footer from './Footer.jsx';
import NotFound from './NotFound.jsx';
import withAuthentication from "../components/RouteProtector";


const App = () => (
  <BrowserRouter>
    <div className='app-container'>
      <NavBar />
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/menu' component={withAuthentication(Menu)} />
          <Route path='/meals' exact component={withAuthentication(MealList)} />
          <Route path='/meals/create' component={withAuthentication(AddMeal)} />
          <Route path='/meals/edit/:id' component={withAuthentication(EditMeal)} />
          <Route path='/order-history' component={withAuthentication(OrderHistory)} />
          <Route path='/set-menu' component={withAuthentication(SetMenu)} />
          <Route component={NotFound}/>
        </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
