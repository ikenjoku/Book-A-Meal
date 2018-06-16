import React, { Component } from 'react';
import { connect } from "react-redux";
import { addAMeal } from "../../actions/mealActions";
import MealForm from './MealForm';

const AddMealForm = (props) => {
  console.log(props);
    return (
      <div className="manage-meals-content">
        <h3 className="center">Add a Meal</h3>
        <div className="contain-form">
          <MealForm onSubmit={(meal) => {
            props.dispatch(addAMeal(meal));
            props.history.push('/meals')
            }}
          />
        </div>
      </div>
    );
  }
export default connect()(AddMealForm);
