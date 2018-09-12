import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MealForm from './MealForm';
import { addAMeal } from '../../actions/mealActions';

export class AddMealForm extends Component {
  onSubmit = (meal) => {
    this.props.addAMeal(meal);
    this.props.history.push('/meals');
  }
  render() {
    return (
      <div className="manage-meals-content">
        <h3 className="center">Add a Meal</h3>
        <div className="contain-form">
          <MealForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

AddMealForm.propTypes = {
  addAMeal: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(undefined, { addAMeal })(AddMealForm);
