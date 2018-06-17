import React from "react";
import { connect } from "react-redux";
import { updateAMeal } from "../../actions/mealActions";
import MealForm from "./MealForm";

const EditMeal = (props) => {
  console.log(props);

  return (
    <div className="manage-meals-content">
    <h3 className="center">Update {props.meal.name} Meal</h3>
      <MealForm
        meal={props.meal}
        onSubmit={(meal) => {
          props.dispatch(updateAMeal(props.meal.id, meal));
          props.history.push('/meals');
        }}
      />
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    meal: state.mealReducer.meals.find((meal) => meal.id === Number(props.match.params.id))
  };
};

export default connect(mapStateToProps)(EditMeal);