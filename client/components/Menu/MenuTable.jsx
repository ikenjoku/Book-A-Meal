import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import MenuList from './MenuList';
import DatePicker from '../DatePicker.jsx';
import { getAMenu } from "../../actions/menuActions.js";

export class MenuTable extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const today = new Date().toISOString().substr(0, 10);
    this.props.getAMenu({ selectedDate: today });
  }

  render() {
    const { menu } = this.props;
    return (
      <div>
        <h2 className="center cool-lg-text">Menu</h2>
        <DatePicker 
          btnName='Get Menu' 
          onSubmit={
          (selectedDate) => this.props.getAMenu(selectedDate)}
        />
        {this.props.error && <p className='error-alert'>No Menu is set for this day</p>}
        {menu && !this.props.error ? <MenuList /> : ''}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  menu: state.menuReducer.selectedMenu,
  error: state.menuReducer.error,
});

export default connect(mapStateToProps, { getAMenu })(MenuTable);
