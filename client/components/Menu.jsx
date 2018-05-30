import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar.jsx';

import { menuSample } from "./mocks";

export default class Menu extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
    <div>
      <NavBar/>
      <main className="menu-list-content">
        <div className="menu-list">
          <MenuTable/>
        </div>
        <div className="order-summary">
          <div className="order-summary-wrap">
            <PreviousOrderTable/>
            <CurrentOrderTable/>
          </div>
        </div>
      </main>
      <footer className="footer">
          <p>Book-A-Meal &copy;2018</p>
      </footer>     
    </div>
    );
  }
}

class MenuTable extends Component{
  constructor(props){
    super(props);
    this.state = {
      meals: menuSample.Meals
    }
  }

  render(){
    return (
      <div>
      <h2 className="center cool-lg-text">Menu List</h2>
        <MenuSearch/>
        <MealList meals={this.state.meals}/>
      </div>
    );
  }
}

class MenuSearch extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <div className="date-picker-pad order-history-date-picker center">
          <form>
            <input 
              id="datePicker" 
              className="input-field-control" 
              type="date" 
              placeholder="Choose a date..." 
              name="date"/>
            <input 
              id="datePickerBtn" 
              className="input-btn-control" 
              type="submit" 
              value="Choose date"/>
          </form>
        </div>
      </div>
    );
  }
}

const MealList = ({meals}) => {

  return (
    <div>
      {meals.map(meal =>
        <div key={meal.id} className="food-item">
          <img src={ require("../static/mealImg.jpg") } alt="" />
          <div className="food-title-desc">
              <p className="food-item-title">{ meal.name }</p>
              <p className="food-item-detail">{ meal.description }</p>
          </div>
          <div className="food-item-price">
              { meal.price }
          </div>
          <div><button className="food-add-btn">Order</button></div>
      </div> 
      )}
    </div>
  );
}

const PreviousOrderTable = (props) => {

  return (
    <div>
    <h4>Previous orders</h4>
    <div className="order-item">
        <div className="order-item-qty">07/3/17</div>
        <div className="order-item-name">Utazi</div>
        <div className="order-item-price">N1400 </div>
    </div>
    <div className="order-item">
        <div className="order-item-qty">12/4/17</div>
        <div className="order-item-name">Jollof rice</div>
        <div className="order-item-price">N200 </div>
    </div>
    <div className="order-item">
        <div className="order-item-qty">15/3/18</div>
        <div className="order-item-name">Boiled Egg</div>
        <div className="order-item-price">N100 </div>
    </div>
    </div>
  );
}


const CurrentOrderTable = (props) => {
  return (
    <div>
    <h4>Current Order</h4>
      <div className="order-item">
        <div className="order-item-qty">Egusi Soup</div>
        <div className="order-item-name">N1200</div>
        <div className="order-item-price"><button className="cancel-order-btn">Cancel Order</button> </div>
      </div>
      <hr/>
    </div>
  );
}
