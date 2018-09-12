import React from 'react';
import MenuTable from './MenuTable';
import PreviousOrderTable from './PreviousOrderTable';
import CurrentOrderTable from './CurrentOrderTable';

const Menu = () =>
  (
    <main id="menu-page" className="menu-list-content">
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
  );

export default Menu;

