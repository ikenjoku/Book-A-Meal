import React, { Component } from 'react';

import NavBar from '../NavBar/NavBar.jsx';
import OrderSearch from './OrderSearch.jsx';
import OrderList from './OrderList.jsx';

import { sampleOrders } from "../mocks";

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: sampleOrders.orders
    }
  }


  render() {
    return (
      <main id='order-history-container' className="order-history-content">
        <div className="cool-lg-text">
          <h2>Order History</h2>
        </div>
        <OrderSearch />
        <OrderList orders={this.state.orders} />
      </main>
    );
  }
}

