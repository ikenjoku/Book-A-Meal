import React, { Component } from 'react';
import MenuDatePicker from './MenuDatePicker.jsx';
import MealList from './MealList.jsx';

import { mealsSample } from "../mocks";

export default class SetMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: mealsSample.meals,
      justCreatedMenu: ''
    }
  }

  render() {
    return (
      <main className="set-menu-page">
      <div className="set-menu-title">
        <h2 className="center cool-lg-text">Create A Menu</h2>
      </div>
        <MenuDatePicker />
        <MealList/>
      </main>
    );
  }
}