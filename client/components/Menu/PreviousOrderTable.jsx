import React from 'react';
import { connect } from "react-redux";

export const PreviousOrderTable = (props) => {
    const deliveredOrders = props.previousOrders.filter(order => order.status === 'delivered');
    return (
    <div>
      <h4>Previous orders</h4>
      <div className='prev-order-container'>
      {deliveredOrders.length === 0 ? <p className='no-history-alert'>No order history</p> :
        deliveredOrders.map(previousOrder =>
        <div key={previousOrder.id} className="previous-order-item">
          <div className="order-item-date">{previousOrder.date}</div>
          <div className="order-item-name">{previousOrder.Meal.name}</div>
          <div className="order-item-price">&#8358; {previousOrder.amount} </div>
        </div>
        )}
      </div>
    </div>
    );
}

export const mapStateToProps = state => ({
  previousOrders: state.orderReducer.previousOrders,
});

export default connect(mapStateToProps, null)(PreviousOrderTable);
