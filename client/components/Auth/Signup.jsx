import React, { Component } from 'react';
import { signupAUser } from "../../actions/authActions/signup";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Signup extends Component {
    state = {
        signUpData: {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        error: ''
    }
    onInputChange = (event) => {
      const { signUpData } = this.state;
      signUpData[event.target.name] = event.target.value.trim();
      this.setState(() => ({ signUpData }));
    }

    onSubmit = (event) => {
      event.preventDefault();
      const { signUpData } = this.state;
      this.props.signupAUser(signUpData)
    }
    render() {
        return (
            <main className="">
                <form className="form-wrapper">
                    <h2 className="center">Sign In</h2>
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={this.state.signUpData.firstname}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={this.state.signUpData.lastname}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            placeholder="Preferred username"
                            value={this.state.signUpData.username}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.signUpData.email}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.signUpData.password}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={this.state.signUpData.confirmPassword}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            className="btn-control loginsubmitBtn"
                            value="Submit"
                        />
                    </div>
                    <div className="right formText">
                        <p>Already have an account? <a href="login.html">Log In</a> </p>
                    </div>
                </form>
            </main>
        );
    }
}


const mapStateToProps = state => {
  return {
    state: state.authReducer,
  }
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({signupAUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
