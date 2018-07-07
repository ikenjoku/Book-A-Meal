import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { deliverAnOrder } from "../../actions/orderActions";

const OrderList = ({ orders, deliverAnOrder, isLoadingOrders }) => {
  let daysTotal = 0;
  let serialNum = 0
  orders.map(order =>{ if(order.status === 'delivered')  daysTotal += order.amount});
  const renderedJsx = orders.length === 0 ? 
  <p className='error-alert'>No Orders found for this day</p> :
  <div>
  <table className="order-table-body">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Customer</th>
            <th>Order Summary</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
          <tbody>
          { orders.map(order =>
            <tr key={order.id}>
              <td >{++serialNum}</td>
              <td>{order.User.firstname} {order.User.lastname}</td>
              <td>{order.Meal.name}</td>
              <td>&#8358;{order.amount}</td>
              <td>{order.status}</td>
              <td>{order.status === 'pending'  && <button className='deliverBtn' onClick={() => deliverAnOrder(order.id)}>deliver</button>}</td>
            </tr>
            )}
          </tbody>          
      </table>
      <div id="total-made">
        <h2>Total: &#8358;{daysTotal}</h2>
      </div>
      </div>
  
  return (
    <div>
      {
        isLoadingOrders ? 
        <div className='loading-spinner'>
          <Loader 
              type="Circles"
              color="#9D2401"
              height="100"
              width="100"
          />
          <h3 id='loader-text'>Fetching...</h3>  
          </div> : renderedJsx
      }
    </div>
  );
}

const mapStateToProps = state => {
  return{
    orders: state.orderReducer.orders,
    isLoadingOrders: state.orderReducer.isLoadingOrders,
    error: state.orderReducer.error
  }
}
export default connect(mapStateToProps, { deliverAnOrder })(OrderList);