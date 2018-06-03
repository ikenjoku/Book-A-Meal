import React from 'react';

const CurrentOrderTable = (props) => {
  return (
    <div>
      <h4>Current Order</h4>
      <div className="order-item">
        <div className="order-item-qty">Egusi Soup</div>
        <div className="order-item-name">N1200</div>
        <div className="order-item-price"><button className="cancel-order-btn">Cancel Order</button> </div>
      </div>
      <hr />
    </div>
  );
}

export default CurrentOrderTable;