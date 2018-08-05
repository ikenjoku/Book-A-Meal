import React, { Component } from 'react';
import MenuDatePicker from './MenuDatePicker.jsx';
import MealList from './MealList.jsx';

const SetMenu = () => {
    return (
      <main className="set-menu-page">
      <div className="set-menu-title">
        <h2 className="center cool-lg-text">Create A Menu</h2>
      </div>
        <MenuDatePicker />
        <MealList/>
      </main>
    );
  }

export default SetMenu;