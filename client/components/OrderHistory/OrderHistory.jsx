import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import DatePicker from '../DatePicker.jsx';
import OrderList from './OrderList.jsx';
import { getOrdersByDate } from "../../actions/orderActions";


class OrderHistory extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    const today = new Date().toISOString().substr(0, 10);
    this.props.getOrdersByDate({ selectedDate: today });
  }

  render() {
    return (
      <main id='order-history-container' className="order-history-content">
        <div className="cool-lg-text">
          <h2>Order History</h2>
        </div>
        <DatePicker btnName='Get Orders' onSubmit={
          (selectedDate) => this.props.getOrdersByDate(selectedDate)
        } />
        <OrderList />
      </main>
    );
  }
}

export default connect(null, { getOrdersByDate })(OrderHistory);
