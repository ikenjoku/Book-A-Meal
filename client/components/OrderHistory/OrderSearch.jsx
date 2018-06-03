import React, { Component } from 'react';


export default class OrderSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
