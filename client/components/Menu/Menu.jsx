import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuTable from './MenuTable.jsx';
import PreviousOrderTable from './PreviousOrderTable.jsx';
import CurrentOrderTable from './CurrentOrderTable.jsx';

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <main className="menu-list-content">
          <div className="menu-list">
            <MenuTable  />
          </div>
          <div className="order-summary">
            <div className="order-summary-wrap">
              <PreviousOrderTable />
              <CurrentOrderTable />
            </div>
          </div>
        </main>
    );
  }
}




