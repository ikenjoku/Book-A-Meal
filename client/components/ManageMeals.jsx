import React, { Component } from 'react';

import NavBar from './NavBar.jsx'
import { mealsSample } from "./mocks";


export default class ManageMeals extends Component {
  constructor(props){
    super(props);
    this.state = {
      meals: mealsSample.meals,
    }
  }

  render(){
    return (
      <div className='contain-page'>
        <NavBar/>
        <main className="manage-meals-content">
            <h2 className="center cool-lg-text">Manage Meals</h2>
            <AddMealForm/>
            <MealList meals={this.state.meals}/>
        </main>
        <footer className="footer">
            <p>Book-A-Meal &copy;2018</p>
        </footer>
      </div>
    );
  }
}



class AddMealForm extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <h3 className="center">Add a Meal</h3>
            <div className="contain-form">
                <form className="add-meal-form">
                  <input 
                    className="form-control" 
                    type="text" 
                    name="name" 
                    placeholder="Meal Name" />
                  
                  <input 
                    className="form-control" 
                    type="text" 
                    name="descriptiion" 
                    placeholder="Short Description" />

                  <input 
                    className="form-control" 
                    type="text" 
                    name="price" 
                    placeholder="Price" />

                  <input 
                    className="form-control" 
                    type="file" 
                    name="image" 
                    placeholder="Upload an image" />
                  
                  <input 
                    className="btn-control loginsubmitBtn" 
                    type="submit" 
                    value="Add Meal" />

                </form>
            </div>
      </div>
    );
  }
}

const MealList = ({meals}) => {
  return (
    <div>
        <h1 className="meal-table-title">All Meal List</h1>
        <div id="all-meal-table">
            <div className="contain-table-headers">
                <p>Image</p>
                <p>Name</p>
                <p>Description</p>
                <p>Price</p>
                <p>Actions</p>
            </div>
            <div className="meal-table">
              { meals.map(meal =>
                <div key={meal.id} className="meal-table-item">
                    <div className="meal-table-item-img">
                      <p><img src={ require("../static/mealImg.jpg") } alt="" /></p>
                    </div>
                    <div className="meal-table-item-name">
                        <p>{meal.name}</p>
                    </div>
                    <div className="meal-table-item-desc">
                        <p>{meal.description}</p>
                    </div>
                    <div className="meal-table-item-price">
                        <p>{meal.price}</p>
                    </div>
                    <div className="meal-table-item-action">
                        <p><a className="mg-meal-btn btn-spacer">Edit</a>
                        <a className="mg-meal-btn btn-danger">Delete</a></p>
                    </div>
                </div>
              ) }
            </div>
            <hr/>
        </div>
    </div>
  );
}