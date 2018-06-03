import React, { Component } from 'react';

const OrderList = ({ orders }) => {

  return (
    <div>
      <div className="order-table-header">
        <p>Order ID</p>
        <p>Customer</p>
        <p>Order Summary</p>
        <p>Amount</p>
      </div>
      <div className="order-table-body">
        {orders.map(order =>
          <div key={order.id} className="order-table-body-row">
            <p>{order.id}</p>
            <p>{order.User.firstname} {order.User.lastname}</p>
            <div className="order-tbody-summary">
              <p>{order.Meal.name}</p>
            </div>
            <p>&#8358;{order.amount}</p>
          </div>
        )}
      </div>
      <div id="total-made">
        <h2>Total: &#8358;150 470.00</h2>
      </div>
    </div>
  );
}

export default OrderList;