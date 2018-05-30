import React, { Component } from 'react';

import NavBar from './NavBar.jsx';

import { sampleOrders } from "./mocks";

export default class OrderHistory extends Component{
  constructor(props){
    super(props);
    this.state = {
      orders: sampleOrders.orders
    }
  }


  render(){
    return (
      <div className="contain-page">
      <NavBar/>
      <main id='order-history-container' className="order-history-content">
          <div className="cool-lg-text">
              <h2>Order History</h2>
          </div>
          <OrderSearch/>
          <OrderList orders={this.state.orders}/>
      </main>
      <footer className="footer order-history-footer">
          <p>Book-A-Meal &copy;2018</p>
      </footer>
  </div>
    );
  }
}


class OrderSearch extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="order-history-date-picker center">
        <form>
          <input 
            className="input-field-control" 
            type="date" 
            placeholder="Choose a date..."  
            name="history-date" />
          <input 
            className="input-btn-control" 
            type="submit" 
            value="Choose date" />
        </form>
    </div>
    );
  }
}

const OrderList = ({orders}) => {

  return (
    <div>
      <div className="order-table-header">
        <p>Order ID</p>
        <p>Customer</p>
        <p>Order Summary</p>
        <p>Amount</p>
      </div>
      <div className="order-table-body">
        { orders.map(order =>
          <div key={order.id} className="order-table-body-row">
              <p>{order.id}</p>
              <p>{order.User.firstname} {order.User.lastname}</p>
              <div className="order-tbody-summary">
                <p>{order.Meal.name}</p>
              </div>
              <p>&#8358;{order.amount}</p>
          </div>
        ) }
      </div>
      <div id="total-made">
          <h2>Total: &#8358;150 470.00</h2>
      </div>
  </div>
  );
}