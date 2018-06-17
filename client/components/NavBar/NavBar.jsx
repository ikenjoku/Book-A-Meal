import React, { Component } from 'react';
import  { Link, NavLink } from 'react-router-dom';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  burgerToggler() {
    let topNav = document.getElementById("myTopnav");
    if (topNav.className === "topnav") {
      topNav.className += " responsive";
    } else {
      topNav.className = "topnav";
    }
  }

  render() {
    return (
      <header>
        <nav className="topnav" id="myTopnav">
          <NavLink to='/' id='companyLogo' activeClassName='activeNavLink' exact>Book-A-Meal</NavLink>
          <NavLink to='/signup' onClick={this.burgerToggler} activeClassName='activeNavLink'>Signup</NavLink>
          <NavLink to='/login' onClick={this.burgerToggler} activeClassName='activeNavLink'>Login</NavLink>
          <a href="javascript:void(0);" className="icon" onClick={this.burgerToggler}>
            <i className="fa fa-bars"></i>
          </a>
        </nav>
      </header>
    );
  }
}