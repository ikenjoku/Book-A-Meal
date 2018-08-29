import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signupAUser } from "../../actions/authActions/signup";

export class Signup extends Component {
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
		event.preventDefault();
		const { signUpData } = this.state;
		signUpData[event.target.name] = event.target.value.trim();
		this.setState(() => ({ signUpData }));
	}

	onSubmit = (event) => {
		event.preventDefault();
		const { signUpData } = this.state;
		if (!signUpData.firstname || !signUpData.lastname || !signUpData.username || !signUpData.email
			|| !signUpData.password || !signUpData.confirmPassword) {
			this.setState(() => ({ error: 'Please fill in all the fields' }));
		} else {
			this.props.signupAUser(signUpData);
		}
	}
	render() {
		return (
			this.props.isLoggedIn === true ? <Redirect to='/menu' /> :
				<main className="signup-bg">
					{this.state.error && <p>{this.state.error}</p>}
					<form className="form-wrapper" onSubmit={this.onSubmit}>
						<h2 className="center">Sign up</h2>
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
							<p>Already have an account? <Link to="/login">Log In</Link> </p>
						</div>
					</form>
				</main>
		);
	}
};

Signup.propTypes = {
	signupAUser: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	authLoading: PropTypes.bool.isRequired,
}

export const mapStateToProps = state => ({
	isLoggedIn: state.authReducer.isLoggedIn,
	authLoading: state.authReducer.authLoading,
});

export default connect(mapStateToProps, { signupAUser })(Signup);
