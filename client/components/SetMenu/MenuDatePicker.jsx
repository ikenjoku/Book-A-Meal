import React, { Component } from 'react';
import { connect } from "react-redux";
import setAMenu, {setSelectedDate} from '../../actions/menuActions';
import moment from 'moment';

class MenuDatePicker extends Component {
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

    this.setState(() => ({ selectedDate: selectedDate }));
    this.props.dispatch(setSelectedDate(selectedDate));
  }
  onSubmission = (event) =>{
    event.preventDefault();
    const selectedDate = this.state.selectedDate;
    const formattedDate = this.state.formattedDate;

    this.props.dispatch(setAMenu({selectedDate, formattedDate}));
  }
  render(){
    // const NewMenuDate = moment(this.props.createdMenu.date).format("dddd, MMMM Do YYYY");

    return (
      <div>
        <div className="order-history-date-picker center">
          <form onSubmit={this.onSubmission}>
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
              value="Create a Menu" />
          </form>
        </div>
        { this.props.createdMenu && this.props.selectedDate === this.props.createdMenu.date ? 
            <p>New Menu Successfully Created. Click to add meals to menu for {moment(this.props.createdMenu.date).format("dddd, MMMM Do YYYY")}</p> : null
        } 
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    selectedDate: state.menuReducer.selectedDate,
    createdMenu: state.menuReducer.createdMenu
  };
};

export default connect(mapStateToProps)(MenuDatePicker);
