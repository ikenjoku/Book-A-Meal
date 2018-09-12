import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAUser } from '../../actions/authActions/logout';


export class Navigation extends Component {
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
      ));
    return (
      <div className="links">
        {links}
      </div>
    );
  }
}

Navigation.propTypes = {
  logoutAUser: PropTypes.func.isRequired,
  navLinks: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default connect(null, { logoutAUser })(Navigation);
