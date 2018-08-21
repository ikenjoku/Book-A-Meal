import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAUser } from "../../actions/authActions/logout";


class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    this.props.logoutAUser();
  }

  render() {
    const links = this.props.navLinks.map(link =>
      (
        <NavLink
          key={link}
          to={link === 'Logout' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
          activeClassName="activeNavLink"
          onClick={link === 'Logout' ? this.logout : this.props.toggleNav}
        >
          {link}
        </NavLink>
      )
    );
    return (
      <div className='links'>
        {links}
      </div>
    );
  }
}


export default connect(null, { logoutAUser })(Navigation);