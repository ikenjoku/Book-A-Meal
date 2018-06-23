import React, { Component } from 'react';
import  { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from "./Navigation.jsx";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  burgerToggler(event) {
    event.preventDefault();
    let topNav = document.getElementById("myTopnav");
    if (topNav.className === "topnav") {
      topNav.className += " responsive";
    } else {
      topNav.className = "topnav";
    }
  }

  render() {
    let navLinks = [];
    navLinks = this.props.isLoggedIn ? ['Menu', 'Logout'] : ['Login', 'Signup'];
    if(this.props.user.isAdmin){
      navLinks = ['Meals', 'Set Menu', 'Order History', ...navLinks]
    }

    return (
      <header>
        <nav className="topnav" id="myTopnav">
          <NavLink to='/' id='companyLogo' activeClassName='activeNavLink' exact>Book-A-Meal</NavLink>
          <Navigation
            activeLink={this.props.activeLink}
            navLinks={navLinks}
          />
          <a className="icon" onClick={this.burgerToggler}>
            <i className="fa fa-bars"></i>
          </a>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = ({authReducer}) => {
  return {
    isLoggedIn: authReducer.isLoggedIn,
    user: authReducer.user,
  }
}


export default connect(mapStateToProps, null)(NavBar);