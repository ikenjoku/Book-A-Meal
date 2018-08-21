import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MealCheckList from './MealCheckList';

class MealSetupForm extends Component {
  state = {
    date: this.props.date || '',
    mealIds: [],
  };

  handleChange = (event) => {
    const selectedDate = event.target.value;

    this.setState(() => (
      {
        date: selectedDate,
      }
    ));
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
        <div>
          <button className='calender-btn'><i className="far fa-calendar-alt fa-2x"></i></button>
          <input
            readOnly
            name="date"
            type='date'
            value={this.state.date}
          />
        </div>
        <h3>Choose meals to add to menu</h3>
        <div className='meal-check-list'>
          <MealCheckList
            meals={this.props.meals}
            handleSelect={this.handleSelect}
          />
        </div>
        <div className='setup-btn-container'>
          <button
            value="Submit"
            type="submit"
          >
            {this.props.action} Menu
        </button>
        </div>
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