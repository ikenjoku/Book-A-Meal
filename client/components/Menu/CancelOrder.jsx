import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cancelAnOrder } from '../../actions/orderActions';

export const CancelOrder = ({ orderId, closeModal, cancelAnOrder }) =>
  (
    <div className="confirm-modal">
      <h3>Are you sure you want to cancel this order?</h3>
      <div>
        <button
          id="confirm-cancel-order"
          onClick={() => {
          cancelAnOrder(orderId);
          closeModal();
          }}
        >Yes
        </button>
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );

CancelOrder.propTypes = {
  orderId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  cancelAnOrder: PropTypes.func.isRequired,
};

export default connect(undefined, { cancelAnOrder })(CancelOrder);
