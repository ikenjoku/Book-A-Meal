import React, { Component } from 'react';


export default class MenuDatePicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="set-menu-title">
          <h2 className="center cool-lg-text">Set Menu</h2>
        </div>
        <div className="order-history-date-picker center">
          <form action="">
            <input
              className="input-field-control"
              type="date"
              placeholder="Choose a date..."
              name="history-date" />
            <input
              className="input-btn-control"
              type="submit"
              value="Create a Menu" />
          </form>
        </div>
      </div>
    );
  }
}