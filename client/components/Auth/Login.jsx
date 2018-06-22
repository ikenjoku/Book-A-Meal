import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
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
      <main className='mainContent'>
        <form className='form-wrapper' onSubmit={this.onSubmit}>
          <h2 className="center">Login</h2>
          <div>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.data.email}
              onChange={this.onFormInput}
            />
          </div>
          <div>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
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
            <p>No Account? <a href="signup.html">Sign Up</a> </p>
            <a href="#">Forgot your password?</a>
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

const mapDispatchToProps = dispatch => 
  bindActionCreators({ loginAUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);