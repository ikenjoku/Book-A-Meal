import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import notify from '../actions/notify';
// import { notifyUser } from "../actions/authActions/login";
 

export default (ComposedComponent) => {

class Authenticate extends Component {

  render(){
      if (this.props.isLoggedIn){
      return <ComposedComponent { ...this.props } /> 
    } else {
      notify.error('Please log in to proceed');
      // this.props.notifyUser('Please log in to proceed');
      return <Redirect to='/login'/>
    }
  }
}
//add proptypes here
const mapStateToProps = ({ authReducer }) => ({
  isLoggedIn: authReducer.isLoggedIn,
  isAdmin: authReducer.user.isAdmin,
});
return connect(mapStateToProps, null)(Authenticate);
};
