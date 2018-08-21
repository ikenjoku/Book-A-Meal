import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MealCheckList from './MealCheckList';

class MealSetupForm extends Component {
  state = {
      date: '',
      mealIds: [],
    };

  handleChange = (event) => {
    this.setState({
      date: event.target.date,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit({
      date: this.state.date,
      mealIds: this.state.mealIds,
    });
  }

  handleSelect = (event) => {
    if (event.target.checked) {
      this.setState({
        mealIds: [
          ...this.state.mealIds,
          event.target.value,
        ],
      });
    } else {
      const currentMealIds = this.state.mealIds.filter(mealId =>
        mealId !== event.target.value);

      this.setState({ mealIds: currentMealIds });
    }
  }

  render() {
    return (
      <form
        className="menu-setup-form"
        onSubmit={this.handleSubmit}
      >
        <h3 className="text-center">
          Setup Menu
        </h3>
        <div>
          <label >
            Date:
          </label>
          <input
            name="date"
            placeholder=""
            value={this.state.date}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <h3>Choose meals to add to menu</h3>
          <MealCheckList
            meals={this.props.meals}
            handleSelect={this.handleSelect}
          />
        </div>
        <button
          value="Submit"
          type="submit"
        >
          {this.props.action} Menu
        </button>
      </form>
    );
  }
}

MealSetupForm.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

export default MealSetupForm;