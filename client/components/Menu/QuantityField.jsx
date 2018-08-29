import React, { Component } from 'react';
import PropTypes from 'prop-types';

const QuantityField = ({ quantity, handleChange }) => {
  return (
    <input
      className="quantity-field"
      type="number"
      name="quantity"
      min="1"
      value={quantity}
      onChange={handleChange}
    />
  );
};

export default QuantityField;
