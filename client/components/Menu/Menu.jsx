import React from 'react';
import MenuTable from './MenuTable.jsx';
import PreviousOrderTable from './PreviousOrderTable.jsx';
import CurrentOrderTable from './CurrentOrderTable.jsx';

const Menu = () =>
  <main className="menu-list-content">
    <div className="menu-list">
      <MenuTable />
    </div>
    <div className="order-summary">
      <div className="order-summary-wrap">
        <CurrentOrderTable />
        <PreviousOrderTable />
      </div>
    </div>
  </main>

export default Menu;

