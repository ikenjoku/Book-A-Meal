import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { loginAUser } from '../../actions/authActions/login';

export class Login extends Component {
  state = {
    data: {
      email: '',
      password: '',
    },
    error: '',
  }

  onFormInput = (event) => {
    event.preventDefault();
    const { data } = this.state;
    data[event.target.name] = event.target.value.trim();
    this.setState(() => ({ data }));
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { data: { email, password } } = this.state;
    if (email && password) {
      this.setState(() => ({ error: '' }));

      this.props.loginAUser({ email, password });
    } else {
      this.setState(() => ({ error: 'email and password are required' }));
    }
  }

  render() {
    return (
      this.props.isLoggedIn === true ? <Redirect to="/menu" /> :
      <main className="mainContent login-bg">
        <form id="login-form" className="form-wrapper" onSubmit={this.onSubmit}>
          <h2 className="center">Login</h2>
          {this.state.error &&
          <div className="alert alert-danger">
            {this.state.error}
          </div>}
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
          <div className="right form-text">
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
};

export const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn,
});

export default connect(mapStateToProps, { loginAUser })(Login);
