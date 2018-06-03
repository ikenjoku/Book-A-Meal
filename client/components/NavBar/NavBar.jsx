import React, { Component } from 'react';

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
      <div className="topnav" id="myTopnav">
        <a href="#home" className="" id='companyLogo'>Book-A-Meal</a>
        <a href="#" onClick={this.burgerToggler}>Signup</a>
        <a href="#" onClick={this.burgerToggler}>Login</a>
        <a href="javascript:void(0);" className="icon" onClick={this.burgerToggler}>
          <i className="fa fa-bars"></i>
        </a>
      </div>
    );
  }
}