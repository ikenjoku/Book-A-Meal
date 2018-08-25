import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAMeal } from "../../actions/mealActions";

export const DeleteMeal = ({ meal, closeModal, removeAMeal }) => {

  return (
    <div className='confirm-modal'>
      <h3>Are you sure you want to delete {meal.name}?</h3>
      <div>
        <button id='confirm-delete-btn' onClick={() => {
          removeAMeal(meal.id);
          closeModal();
          }}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );
};

DeleteMeal.propTypes = {
  meal: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  removeAMeal: PropTypes.func.isRequired,
}

export default connect(undefined, { removeAMeal })(DeleteMeal);