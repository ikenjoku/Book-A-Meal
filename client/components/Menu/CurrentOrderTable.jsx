import React from 'react';
import { connect } from 'react-redux';
import { cancelAnOrder, modifyOrderStatus } from "../../actions/orderActions";

const CurrentOrderTable = ({currentOrders, changeOrderStatus, cancelAnOrder, modifyOrderStatus, orderIdToModify}) => {
  const pendingOrders = currentOrders.filter(order => order.status === 'pending');
  console.log('======', changeOrderStatus, orderIdToModify)

  return (
    <div>
      <h4>Current Order</h4>
      {pendingOrders.length === 0 ? <p>No current orders</p> : 
      pendingOrders.map(order => 
        <div key={order.id} className="order-item">
          <div className="order-item-qty">{order.Meal.name}</div>
          <div className="order-item-name">{order.amount}</div>
          <div className="order-item-price"><button onClick={() => {modifyOrderStatus(!changeOrderStatus, order.id)}} className="cancel-order-btn">change</button> 
          <button onClick={() => {cancelAnOrder(order.id)}} className="cancel-order-btn">X</button> </div>
        </div>
      )}
      <hr />
    </div>
  );
}

const mapStateToProps = state => ({
  currentOrders: state.orderReducer.previousOrders,
  changeOrderStatus: state.orderReducer.changeOrderStatus,
  orderIdToModify: state.orderReducer.orderIdToModify

});

export default connect(mapStateToProps, { cancelAnOrder, modifyOrderStatus })(CurrentOrderTable);