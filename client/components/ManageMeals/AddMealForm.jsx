import React, { Component } from 'react';
import { connect } from "react-redux";
import { addAMeal } from "../../actions/mealActions";
import MealForm from './MealForm';

export class AddMealForm extends Component {
  onSubmit = (meal) => {
    this.props.addAMeal(meal);
    this.props.history.push('/meals')
  }
  render() {
    return (
      <div className="manage-meals-content">
        <h3 className="center">Add a Meal</h3>
        <div className="contain-form">
          <MealForm onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addAMeal: (meal) => dispatch(addAMeal(meal))
});

export default connect(undefined, mapDispatchToProps)(AddMealForm);
