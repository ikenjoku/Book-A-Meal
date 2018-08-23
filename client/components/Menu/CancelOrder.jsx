import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cancelAnOrder } from "../../actions/orderActions";

const CancelOrder = ({ orderId, closeModal, cancelAnOrder }) => {

  return (
    <div>
      <h3>Are you sure you want to cancel this order?</h3>
      <div>
        <button onClick={() => {
          cancelAnOrder(orderId);
          closeModal();
          }}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );
};

export default connect(undefined, { cancelAnOrder })(CancelOrder);