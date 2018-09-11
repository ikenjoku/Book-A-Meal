import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import notify from '../../actions/notify';
import { logoutAUser } from '../../actions/authActions/logout';

class LoginRedirect extends Component{
  componentDidMount(){
    this.props.logoutAUser()
  }
  render(){
  return (<Redirect to="/login" />);
  }
} 

export default connect(null, { logoutAUser })(LoginRedirect);
