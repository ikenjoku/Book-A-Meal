import React, { Component } from 'react';

import NavBar from '../NavBar/NavBar.jsx';
import AddMealForm from './AddMealForm.jsx';
import MealList from "./MealList";
import { mealsSample } from "../mocks";


export default class ManageMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: mealsSample.meals,
    }
  }

  render() {
    return (
      <main className="manage-meals-content">
        <h2 className="center cool-lg-text">Manage Meals</h2>
        <AddMealForm />
        <MealList meals={this.state.meals} />
      </main>
    );
  }
}


