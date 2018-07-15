import React, { Component } from 'react';

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
              <CurrentOrderTable />
              <PreviousOrderTable />
            </div>
          </div>
        </main>
    );
  }
}




