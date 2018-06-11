import React, { Component } from 'react';

import NavBar from '../NavBar/NavBar.jsx';
import OrderSearch from './OrderSearch.jsx';
import OrderList from './OrderList.jsx';

import { sampleOrders } from "../mocks";
import axios from 'axios';
import API from '../axiosConfig';

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      error: ''
    }
    this.getOrderHistory = this.getOrderHistory.bind(this);
  }
  getOrderHistory(orderDate){
    console.log(`get the order history for ${orderDate}`)
    API.get('/orders/date', { params: { date: orderDate } })
    .then(({ data: { orders } }) => this.setState({ orders: orders }))
    .catch(error => this.setState({error: error.message}));
  }

  render() {
    return (
      <main id='order-history-container' className="order-history-content">
        <div className="cool-lg-text">
          <h2>Order History</h2>
        </div>
        <OrderSearch getOrderHistory={this.getOrderHistory}/>
        {!this.state.error && <OrderList orders={this.state.orders} />}
        {this.state.error && <h3>No orders found for this day</h3>}
      </main>
    );
  }
}

