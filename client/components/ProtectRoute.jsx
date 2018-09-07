import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import notify from '../actions/notify';
import { isExpiredToken } from '../utils/authHelpers';


export default (ComposedComponent) => {
  class ProtectRoute extends Component {
    isLoggedIn = () => {
      if (localStorage.BAMtoken) {
        return true;
      }
      return false;
    }

    isValidToken = () => {
      if (localStorage.BAMtoken) {
        return isExpiredToken(localStorage.BAMtoken);
      }
      return false;
    }

    render() {
      if (this.isLoggedIn() && this.isValidToken()) {
        return <ComposedComponent {...this.props} />;
      }
      notify.error('Please log in to proceed');
      return <Redirect to="/login" />;
    }
  }

  const mapStateToProps = ({ authReducer }) => ({
    isLoggedIn: authReducer.isLoggedIn,
    isAdmin: authReducer.user.isAdmin,
  });
  return connect(mapStateToProps, null)(ProtectRoute);
};
