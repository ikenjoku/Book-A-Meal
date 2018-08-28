import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import { loginAUser } from "../../actions/authActions/login";

export class Login extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  onFormInput = (event) => {
    event.preventDefault();
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
      this.props.isLoggedIn === true ? <Redirect to='/menu' /> :
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
            </div>
          </form>
        </main>
    );
  }
}

Login.propTypes = {
  loginAUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  authLoading: PropTypes.bool.isRequired,
}

export const mapStateToProps = state => ({
    isLoggedIn: state.authReducer.isLoggedIn,
    authLoading: state.authReducer.authLoading,
});

export default connect(mapStateToProps, { loginAUser })(Login);