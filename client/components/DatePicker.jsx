import React, { Component } from 'react';

export default class DatePicker extends Component {
  state = {
    selectedDate: '',
  }

  onDateChange = (event) => {
    const selectedDate = event.target.value;
    this.setState(() => ({ selectedDate: selectedDate }));
    if (this.props.onChange) { this.props.onChange({ selectedDate }) }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const { selectedDate } = this.state;
    this.props.onSubmit({ selectedDate })
  }

  render() {
    return (
      <div className="order-history-date-picker center">
        <form onSubmit={this.onFormSubmit}>
          <input
            className="input-field-control"
            type="date"
            name="menu-date"
            value={this.state.selectedDate}
            onChange={this.onDateChange}
          />
          <input
            className="input-btn-control"
            type="submit"
            value={this.props.btnName} />
        </form>
      </div>
    );
  }
}