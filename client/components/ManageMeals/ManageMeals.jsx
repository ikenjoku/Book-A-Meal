import React, { Component } from 'react';

import NavBar from '../NavBar/NavBar.jsx';
import AddMealForm from './AddMealForm.jsx';
import MealList from "./MealList";
// import EditMeal from './EditMeal';

import { mealsSample } from "../mocks";
import axios from 'axios';
import API from '../axiosConfig';


export default class ManageMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      message: '',
      error: '',
      selectedToUpdate: 1,
      mealToUpdate: undefined,
    }
    this.handleCreateMeal = this.handleCreateMeal.bind(this);
    this.handelUpdateMeal = this.handelUpdateMeal.bind(this);
    this.handleDeleteMeal = this.handleDeleteMeal.bind(this);
    this.clearUpdateModal = this.clearUpdateModal.bind(this);
  }

  componentDidMount(){
    this.getAllMeals();
  }

  getAllMeals(){
    API.get('/meals')
      .then(res => {
        // console.log(res);
        this.setState({ meals: res.data.meals });
      })
      .catch(err => {
        // console.log(err);
      })
  }

  clearUpdateModal(){
    this.setState({ selectedToUpdate: undefined });
  }

  handleCreateMeal(newMeal){
    const formData = new FormData(newMeal);
    formData.name = newMeal.name;
    formData.description = newMeal.description;
    formData.price = newMeal.price;
    formData.imageurl = newMeal.imageurl
    console.log(formData);
    API.post('/meals', newMeal)
      .then(({ data: { meal, message } }) => {
        // console.log(meal);
        // console.log(message);
        this.getAllMeals();
      })
      .catch(error => this.setState({ error: error.response.data.message }))
  }

  handelUpdateMeal(mealId){
    // console.log('update meal', mealId);
    const mealToUpdate =this.state.meals.filter(meal => {
      return meal.id === mealId;
    })
    this.setState({ 
      mealToUpdate: mealToUpdate[0],
      selectedToUpdate: mealId, 
    })
  }

  handleDeleteMeal(mealId){
    API.delete(`/meals/${mealId}`)
      .then(res => {
        // console.log(res);
        this.getAllMeals();
      })
      .catch(err => {
        consol.log(err);
      })
  }
  render() {
    return (
      <main className="manage-meals-content">
        <h2 className="center cool-lg-text">Manage Meals</h2>
        <AddMealForm 
          handleCreateMeal={this.handleCreateMeal} 
          statusMessage={this.state.statusMessage}
        />
        <MealList 
          meals={this.state.meals} 
          handleDeleteMeal={this.handleDeleteMeal}
          handelUpdateMeal={this.handelUpdateMeal} 
        />
        {/* <EditMeal 
          selectedToUpdate={this.state.selectedToUpdate}
          mealToUpdate={this.state.mealToUpdate}
          clearUpdateModal={this.clearUpdateModal} 
        /> */}
      </main>
    );
  }
}


