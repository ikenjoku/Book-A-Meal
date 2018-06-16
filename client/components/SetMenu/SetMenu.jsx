import React, { Component } from 'react';

import NavBar from '../NavBar/NavBar.jsx';
import MenuDatePicker from './MenuDatePicker.jsx';
import MealList from './MealList.jsx';
import axios from 'axios';
import API from '../../axiosConfig';

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
        <MenuDatePicker />
        {this.state.justCreatedMenu && <p>New Menu Successfully created</p>}
        <p>{this.state.justCreatedMenu ? 
          `Click to add meals to menu for ${this.state.justCreatedMenu}` :
          'Create a new menu'  } </p>
        <MealList meals={this.state.meals} />
      </main>
    );
  }
}