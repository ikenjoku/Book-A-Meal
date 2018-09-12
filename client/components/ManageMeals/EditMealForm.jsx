import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MealForm from './MealForm';
import { updateAMeal } from '../../actions/mealActions';

export class EditMealForm extends Component {
  onSubmit = (meal) => {
    this.props.updateAMeal(this.props.meal.id, meal);
    this.props.history.push('/meals');
  }

  render() {
    return (
      <div className="manage-meals-content">
        <h3 className="center">Update {this.props.meal.name} Meal</h3>
        <MealForm
          meal={this.props.meal}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

EditMealForm.propTypes = {
  updateAMeal: PropTypes.func.isRequired,
  meal: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export const mapStateToProps = (state, props) => ({
  meal: state.mealReducer.paginatedMeals.find(meal => meal.id === Number(props.match.params.id)),
});

export default connect(mapStateToProps, { updateAMeal })(EditMealForm);
