import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './Footer';
import Menu from './Menu/Menu';
import Landing from './Landing';
import Login from './Auth/Login';
import NotFound from './NotFound';
import Signup from './Auth/Signup';
import NavBar from './NavBar/Index';
import SetupMenu from './SetupMenu/SetupMenu';
import MealList from './ManageMeals/MealList';
import AddMeal from './ManageMeals/AddMealForm';
import EditMeal from './ManageMeals/EditMealForm';
import OrderHistory from './OrderHistory/OrderHistory';
import withAuthentication from '../components/ProtectRoute';

const App = () => (
  <BrowserRouter>
    <div className="app-container">
      <NavBar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/menu" component={withAuthentication(Menu)} />
        <Route path="/meals" exact component={withAuthentication(MealList)} />
        <Route path="/meals/create" component={withAuthentication(AddMeal)} />
        <Route path="/meals/edit/:id" component={withAuthentication(EditMeal)} />
        <Route path="/order-history" component={withAuthentication(OrderHistory)} />
        <Route path="/set-menu" component={withAuthentication(SetupMenu)} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
