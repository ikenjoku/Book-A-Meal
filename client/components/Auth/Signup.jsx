import React, { Component } from 'react';

import NavBar from '../NavBar/NavBar.jsx';

export default class Signup extends Component {
    constructor(props) {
        super(props);
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
                        />
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            placeholder="Preferred username"
                        />
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <input
                            className="form-control"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
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
