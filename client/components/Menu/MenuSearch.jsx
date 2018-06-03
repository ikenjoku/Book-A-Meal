import React, {Component} from 'react';

export default class MenuSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="date-picker-pad order-history-date-picker center">
          <form>
            <input
              id="datePicker"
              className="input-field-control"
              type="date"
              placeholder="Choose a date..."
              name="date" />
            <input
              id="datePickerBtn"
              className="input-btn-control"
              type="submit"
              value="Choose date" />
          </form>
        </div>
      </div>
    );
  }
}
