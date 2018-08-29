import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from "./Navigation";

export class Index extends Component {
  constructor(props) {
    super(props);
  }

  toggleNav(event) {
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
    if (this.props.user.isAdmin) {
      navLinks = ['Meals', 'Set Menu', 'Order History', ...navLinks]
    }
    return (
      <header>
        <nav className="topnav" id="myTopnav">
          <NavLink to='/' id='companyLogo' exact><i className="fas fa-utensils"></i> Book-A-Meal</NavLink>
          <Navigation
            activeLink={this.props.activeLink}
            navLinks={navLinks}
            toggleNav={this.toggleNav}
          />
          <Link to="#" className="icon" onClick={this.toggleNav}>
            <i className="fa fa-bars"></i>
          </Link>
        </nav>
      </header>
    );
  }
}

export const mapStateToProps = ({ authReducer }) => {
  return {
    isLoggedIn: authReducer.isLoggedIn,
    user: authReducer.user,
  }
}


export default connect(mapStateToProps, null, null, { pure: false })(Index);