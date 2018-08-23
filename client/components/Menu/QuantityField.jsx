import React, { Component } from 'react';
import PropTypes from 'prop-types';

const QuantityField = ({ quantity, handleChange }) => {
  const onChange = (event) => {
    handleChange(event);
  }

  return (
    <input
      type="number"
      name="quantity"
      min="1"
      value={quantity}
      onChange={onChange}
    />
  );
};

export default QuantityField;
