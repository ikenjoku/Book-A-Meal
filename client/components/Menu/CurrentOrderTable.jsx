import React from 'react';
import { connect } from 'react-redux';
import { cancelAnOrder, modifyOrderStatus } from "../../actions/orderActions";

export const CurrentOrderTable = ({currentOrders, changeOrderStatus, cancelAnOrder, modifyOrderStatus, orderIdToModify}) => {
  const pendingOrders = currentOrders.filter(order => order.status === 'pending');

  return (
    <div>
      <h4>Current Order</h4>
      {pendingOrders.length === 0 ? <p>No current orders</p> : 
      pendingOrders.map(order => 
        <div key={order.id} className="order-item">
          <div className="order-item-name">{order.Meal.name}</div>
          <div className="order-item-amount">&#8358; {order.amount}</div>
          <div className="order-item-actions"><button className={changeOrderStatus && orderIdToModify === order.id ? 'highlight-btn' : undefined} onClick={() => {modifyOrderStatus(!changeOrderStatus, order.id)}} ><i className='far fa-edit'></i></button> 
          <button className='cancel-order-icon' onClick={() => {cancelAnOrder(order.id)}}><i className="far fa-times-circle 5x"></i></button> </div>
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