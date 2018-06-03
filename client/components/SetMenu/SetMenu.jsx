import React, { Component } from 'react';

import NavBar from '../NavBar/NavBar.jsx';
import MenuDatePicker from './MenuDatePicker.jsx';
import MealList from './MealList.jsx';

import { mealsSample } from "../mocks";

export default class SetMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: mealsSample.meals,
    }
  }

  render() {
    return (
      <main className="set-menu-page">
        <MenuDatePicker />
        <MealList meals={this.state.meals} />
      </main>
    );
  }
}