import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export const MealCheckList = ({ meals, handleSelect, isFetching }) => {
  return (isFetching ? 
    <h3>Fetching meals...</h3>
    :
    meals.map(meal => (
    <div key={meal.id}>
      <label>
        <input
          type="checkbox"
          name="meals"
          value={meal.id}
          onClick={handleSelect}
          />
          <span>{meal.name}</span>
      </label>
    </div>
  )));
};

export const mapStateToProps = state => ({
  isFetching: state.setupMenuReducer.isFetching,
});

MealCheckList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSelect: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(MealCheckList);
