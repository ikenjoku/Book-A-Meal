import React from 'react';

const PreviousOrderTable = (props) => {

  return (
    <div>
      <h4>Previous orders</h4>
      <div className="order-item">
        <div className="order-item-qty">07/3/17</div>
        <div className="order-item-name">Utazi</div>
        <div className="order-item-price">N1400 </div>
      </div>
      <div className="order-item">
        <div className="order-item-qty">12/4/17</div>
        <div className="order-item-name">Jollof rice</div>
        <div className="order-item-price">N200 </div>
      </div>
      <div className="order-item">
        <div className="order-item-qty">15/3/18</div>
        <div className="order-item-name">Boiled Egg</div>
        <div className="order-item-price">N100 </div>
      </div>
    </div>
  );
}

export default PreviousOrderTable;