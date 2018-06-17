import React, { Component } from 'react';


export default class OrderSearch extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(e){
    e.preventDefault();
    const orderDate = e.target.elements.orderDate.value;
    this.props.getOrderHistory(orderDate);
  }

  render() {
    return (
      <div className="order-history-date-picker center">
        <form onSubmit={this.handleFormSubmit}>
          <input
            className="input-field-control"
            type="date"
            placeholder="Choose a date..."
            name="orderDate" />
          <input
            className="input-btn-control"
            type="submit"
            value="Choose date" />
        </form>
      </div>
    );
  }
}
