import React, { Component } from 'react';
import  { Link } from 'react-router-dom';

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
          <Link to='/' id='companyLogo'>Book-A-Meal</Link>
          <Link to='/signup' onClick={this.burgerToggler}>Signup</Link>
          <Link to='/login' onClick={this.burgerToggler}>Login</Link>
          <a href="javascript:void(0);" className="icon" onClick={this.burgerToggler}>
            <i className="fa fa-bars"></i>
          </a>
        </nav>
      </header>
    );
  }
}