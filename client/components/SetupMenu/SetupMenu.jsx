import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import DatePicker from '../DatePicker.jsx';
import MenuCard from './MenuCard.jsx';
import { getAMenu, setSelectedDate } from "../../actions/setupMenuActions";

export class SetupMenu extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    const today = new Date().toISOString().substr(0, 10);
    this.props.getAMenu({ selectedDate: today });
    this.props.setSelectedDate({ selectedDate: today });
  }

  render() {
    return (
      <main id='setup-menu-container'>
        <div className="cool-lg-text">
          <h2>Setup Menu</h2>
        </div>
        <DatePicker btnName='Find Menu'
          onSubmit={selectedDate => this.props.getAMenu(selectedDate)}
          onChange={selectedDate => this.props.setSelectedDate(selectedDate)}
        />
        <MenuCard />
      </main>
    );
  }
}

export default connect(null, { getAMenu, setSelectedDate })(SetupMenu);
