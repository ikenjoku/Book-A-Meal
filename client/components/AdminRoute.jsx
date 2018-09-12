import React, { Component } from 'react';
import { connect } from 'react-redux';
import notify from '../actions/notify';
import { isExpiredToken } from '../utils/authHelpers';
import LoginRedirect from '../components/Auth/LoginRedirect'


export default (ComposedComponent) => {
  class AdminRoute extends Component {
    isLoggedIn = () => {
      if (localStorage.BAMtoken) {
        return true;
      }
      return false;
    }

    isInValidToken = () => {
      if (localStorage.BAMtoken) {
        return isExpiredToken(localStorage.BAMtoken);
      }
      return false;
    }

    render() {
      const { isAdmin } = this.props;

      if (this.isLoggedIn() && !this.isInValidToken() && isAdmin) {
        return <ComposedComponent {...this.props} />;
      }
      notify.error('Permissions Required. Re-login to continue');
      return <LoginRedirect />;
    }
  }

  const mapStateToProps = ({ authReducer }) => ({
    isLoggedIn: authReducer.isLoggedIn,
    isAdmin: authReducer.user.isAdmin,
  });
  return connect(mapStateToProps, null)(AdminRoute);
};
