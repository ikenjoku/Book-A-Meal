import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import { loginAUser } from "../../actions/authActions/login";

class Login extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  onFormInput = (event) => {
    const { data } = this.state;
    data[event.target.name] = event.target.value.trim();
    this.setState(() => ({ data }));
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { data } = this.state;
    this.props.loginAUser(data)
  }

  render() {
    return (
      this.props.isLoggedIn === true ?  <Redirect to='/menu'/> :
      <main className='mainContent login-bg'>
        <form className='form-wrapper' onSubmit={this.onSubmit}>
          <h2 className="center">Login</h2>
          <div>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="Enter your email"
              value={this.state.data.email}
              onChange={this.onFormInput}
            />
          </div>
          <div>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter you password"
              value={this.state.data.password}
              onChange={this.onFormInput}
            />
          </div>
          <div>
            <input
              className="btn-control loginsubmitBtn"
              type="submit"
              value="Submit"
            />
          </div>
          <hr />
          <div className="right formText">
            <p>No Account? <Link to="/signup">Sign Up</Link> </p>
            <Link to="#">Forgot your password?</Link>
          </div>
        </form>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
  isLoggedIn: state.authReducer.isLoggedIn,
  authLoading: state.authReducer.authLoading,
  }
};

export default connect(mapStateToProps, {loginAUser})(Login);