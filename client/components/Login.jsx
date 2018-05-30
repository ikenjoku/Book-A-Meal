import React, { Component } from 'react';

import NavBar from './NavBar.jsx';

export default class Login extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return  (
      <div>
      <NavBar />
      <main className='mainContent'>
          <form className='form-wrapper'>
          <h2 className="center">Login</h2>
          <div>
              <input 
                className="form-control" 
                type="text" 
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
                className="btn-control loginsubmitBtn"
                type="submit"  
                value="Submit"
              />
            </div>

            <hr />
            <div className="center">
              <p>OR</p>
              <a href="" className="formText btn-google">Sign in with Google</a>
            </div>
            <div className="right formText">
              <p>No Account? <a href="signup.html">Sign Up</a> </p>
              <a href="#">Forgot your password?</a>
            </div>
          </form>
        </main>
        <footer className="footer">
          <p>Book-A-Meal &copy;2018</p>
        </footer>
      </div>
    );
  }
}