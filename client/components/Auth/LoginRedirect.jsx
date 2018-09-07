import React from 'react';
import { Redirect } from 'react-router-dom';
import notify from '../../actions/notify';

const LoginRedirect = () => {
  notify.error('Please log in to proceed');
  return (<Redirect to="/login" />);
};

export default LoginRedirect;
