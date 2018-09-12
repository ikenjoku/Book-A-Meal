import React, { Component } from 'react';
import { connect } from 'react-redux';
import notify from '../actions/notify';
import { isExpiredToken } from '../utils/authHelpers';
import LoginRedirect from '../components/Auth/LoginRedirect'


export default (ComposedComponent) => {
  class ProtectRoute extends Component {
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
      if (this.isLoggedIn() && !this.isInValidToken()) {
        return <ComposedComponent {...this.props} />;
      }
      notify.error('Please log in to proceed');
      return <LoginRedirect />;
    }
  }

  const mapStateToProps = ({ authReducer }) => ({
    isLoggedIn: authReducer.isLoggedIn,
    isAdmin: authReducer.user.isAdmin,
  });
  return connect(mapStateToProps, null)(ProtectRoute);
};
