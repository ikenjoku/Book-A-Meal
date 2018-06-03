import React, { Component } from 'react';

import MenuSearch from "./MenuSearch.jsx";
import MealList from './MealList.jsx';


export default class MenuTable extends Component {

  render() {
    const { menu } = this.props;
    return (
      <div>
        <h2 className="center cool-lg-text">Menu List</h2>
        <MenuSearch />
        <MealList meals={menu} />
      </div>
    );
  }
}
