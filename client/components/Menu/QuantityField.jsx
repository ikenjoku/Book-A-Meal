import React from 'react';
import PropTypes from 'prop-types';

const QuantityField = ({ quantity, handleChange }) =>
  (
    <input
      className="quantity-field"
      type="number"
      name="quantity"
      min="1"
      value={quantity}
      onChange={handleChange}
    />
  );

QuantityField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default QuantityField;
