import React, { Component } from "react";
import { connect } from "react-redux";
import { updateAMeal } from "../../actions/mealActions";
import MealForm from "./MealForm";


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

const mapStateToProps = (state, props) => {
  return {
    meal: state.mealReducer.paginatedMeals.find((meal) => meal.id === Number(props.match.params.id))
  };
};

const mapDispatchToProps = dispatch => ({
  updateAMeal: (id, meal) => dispatch(updateAMeal(id, meal))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMealForm);