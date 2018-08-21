import React, { Component } from 'react';
import moment from 'moment';


export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: '',
      formattedDate: '',
    }
  }
  onDateChange = (event) => {
    const selectedDate = event.target.value;
    const formattedDate = moment(selectedDate).format("dddd, MMMM Do YYYY");

    this.setState(() => (
      {
        selectedDate: selectedDate,
        formattedDate: formattedDate,
      }
    ));
    if (this.props.onChange) {
      this.props.onChange({ selectedDate })
    }
  }
  onFormSubmit = (event) => {
    event.preventDefault();
    const { selectedDate, formattedDate } = this.state;
    this.props.onSubmit({ selectedDate, formattedDate })
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