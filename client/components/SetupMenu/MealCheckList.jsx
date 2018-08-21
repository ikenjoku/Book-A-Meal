import React from 'react';
import PropTypes from 'prop-types';

const MealCheckList = ({ meals, handleSelect }) => {
  const handleClick = (event) => {
    handleSelect(event);
  }

  return meals.map(meal => (
    <div key={meal.id}>
      <label>
        <input
          type="checkbox"
          name="meals"
          value={meal.id}
          onClick={handleClick}
          />
          <span>{meal.name}</span>
      </label>
    </div>
  ));
};

MealCheckList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default MealCheckList;
