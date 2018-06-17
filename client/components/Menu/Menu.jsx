import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import NavBar from '../NavBar/NavBar.jsx';
import MenuTable from './MenuTable.jsx';
import PreviousOrderTable from './PreviousOrderTable.jsx';
import CurrentOrderTable from './CurrentOrderTable.jsx';

import { menuSample } from '../mocks.js';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { menu: [] }
  }

  componentDidMount() {
    getMenu.bind(this)('2018-05-18');
  }

  render() {
    console.log('=====\n', this.state.menu, '\n=====');
    return (
        <main className="menu-list-content">
          <div className="menu-list">
            <MenuTable menu={this.state.menu} />
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
function getMenu(date) {
  return axios.get('http://localhost:9000/api/v1/menu', { params: { date } })
    .then(({ data: { Meals } }) => this.setState({ menu: Meals }))
    .catch(error => this.setState({ error: error.response.data.message }))
}



