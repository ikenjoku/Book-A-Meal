import React from 'react';
import { connect } from 'react-redux';


const CurrentOrderTable = ({currentOrders}) => {
  const pendingOrders = currentOrders.filter(order => order.status === 'pending');
  console.log('======', currentOrders)

  return (
    <div>
      <h4>Current Order</h4>
      {pendingOrders.length === 0 ? <p>No current orders</p> : 
      pendingOrders.map(order => 
        <div key={order.id} className="order-item">
          <div className="order-item-qty">{order.Meal.name}</div>
          <div className="order-item-name">{order.amount}</div>
          <div className="order-item-price"><button className="cancel-order-btn">change</button> <button className="cancel-order-btn">X</button> </div>
        </div>
      )}
      <hr />
    </div>
  );
}

const mapStateToProps = state => ({
  currentOrders: state.orderReducer.previousOrders,
});

export default connect(mapStateToProps, null)(CurrentOrderTable);