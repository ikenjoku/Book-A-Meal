import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from "react-toastify";

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
            <ToastContainer
              position="top-right"
              autoClose={4999}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
              />
              <PreviousOrderTable />
              <CurrentOrderTable />
            </div>
          </div>
        </main>
    );
  }
}




