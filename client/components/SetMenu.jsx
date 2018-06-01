import React, { Component } from 'react';

import NavBar from './NavBar.jsx';

import { mealsSample } from "./mocks";



export default class SetMenu extends Component{
  constructor(props){
    super(props);
    this.state = {
      meals: mealsSample.meals,
    }
  }

  render(){
    return (
      <div className="contain-page">
        <NavBar/>
        <main className="set-menu-page">
            <MenuDatePicker/>
            <MealList meals={ this.state.meals} />
        </main>
        <footer className="footer">
            <p>Book-A-Meal &copy;2018</p>
        </footer>
    </div>
    );
  }
}


class MenuDatePicker extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <div className="set-menu-title">
          <h2 className="center cool-lg-text">Set Menu</h2>
        </div>
        <div className="order-history-date-picker center">
          <form action="">
            <input 
              className="input-field-control" 
              type="date" 
              placeholder="Choose a date..." 
              name="history-date" />
            <input 
              className="input-btn-control" 
              type="submit" 
              value="Create a Menu" />
          </form>
        </div>
      </div>  
    );
  }
}


const MealList = ({meals}) => {
  return (
    <div className="contain-set-menu-meal-table">
      <div className="set-menu-table-headers">
          <p>Image</p>
          <p>Name</p>
          <p>Description</p>
          <p>Action</p>
      </div>
        <div className="set-menu-table-body">
        {meals.map(meal => 
          <div key={meal.id} className="set-menu-meal-item">
          <img src={ require("../static/mealImg.jpg") } alt="" />
              <div className="food-title-desc">
                  <p className="food-item-title">Rice and Beans</p>
                  <p className="food-item-detail">Rice, Beans, Plantain, Panla Sauce, Max Coke</p>
              </div>
              <div className="food-item-price">
                  N1400
              </div>
              <div><button className="food-add-btn">Add to menu</button></div>
          </div>
        )}
        </div>
      </div>
  );
}