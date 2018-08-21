import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { removeAMeal } from "../actions/mealActions.js";


const OptionModal = (props) => (
  <Modal
    isOpen={!!props.showDeleteModal}
    onRequestClose={props.handleModalClose}
    closeTimeoutMS={200}
    className="deleteModal"
    contentLabel='Confirm Delete'
  >
    <h3>Are you sure you want to delete {props.showDeleteModal} meal</h3>
    <button
      onClick={(e) => {
        props.removeAMeal({ id: props.mealId });
        props.handleModalClose();
      }}>Yes</button>
    <button onClick={props.handleModalClose}>No</button>
  </Modal>
);


export default connect(undefined, { removeAMeal })(OptionModal);