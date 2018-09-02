import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { getAMeals } from '../../actions/setupMenuActions';
import MealCheckList from './MealCheckList';

export class MealSetupForm extends Component {
  state = {
    date: this.props.date || '',
    mealIds: [],
    activePage: 1,
  };

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

  handlePageChange = (pageNumber) => {
    const limit = 5;
    this.props.getAMeals({ limit, page: pageNumber });
    this.setState(() => ({ activePage: pageNumber }));
  }

  render() {
    return (
      <form
        className="menu-setup-form"
        onSubmit={this.handleSubmit}
      >
        <div>
          <button className="calender-btn">
            <i className="far fa-calendar-alt fa-2x" />
          </button>
          <input
            readOnly
            name="date"
            type="date"
            value={this.state.date}
          />
        </div>
        <h3>Choose meals to add to menu</h3>
        <div className="meal-check-list">
          <MealCheckList
            meals={this.props.meals}
            handleSelect={this.handleSelect}
          />
        </div>
        <div className="center">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.props.count}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
        <div className="setup-btn-container">
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
  date: PropTypes.string.isRequired,
  getAMeals: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export const mapStateToProps = state => ({
  count: state.setupMenuReducer.count,
  pages: state.setupMenuReducer.pages,
});

MealSetupForm.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { getAMeals })(MealSetupForm);
