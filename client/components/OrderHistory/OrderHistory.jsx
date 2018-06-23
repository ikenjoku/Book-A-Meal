import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DatePicker from '../DatePicker.jsx';
import OrderList from './OrderList.jsx';
import { getOrdersByDate } from "../../actions/orderActions";


class OrderHistory extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount(){
    const today = new Date().toISOString().substr(0, 10);
    this.props.getOrdersByDate({selectedDate:today});
  }

  render() {
    const { orders } = this.props;
    return (
      <main id='order-history-container' className="order-history-content">
        <div className="cool-lg-text">
          <h2>Order History</h2>
        </div>
        <DatePicker btnName='Get Orders' onSubmit={
          (selectedDate) => this.props.getOrdersByDate(selectedDate)
        }/>
        {this.props.error && <p className='error-alert'>No Orders found for this day</p> }
         { orders && !this.props.error ?
        <OrderList orders={this.props.orders} />
        : ''}
      </main>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    orders: state.orderReducer.orders,
    isLoadingOrders: state.orderReducer.isLoading,
    error: state.orderReducer.error
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOrdersByDate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
