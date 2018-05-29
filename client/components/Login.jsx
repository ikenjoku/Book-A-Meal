import React from 'react';

import NavBar from './NavBar';

export default class Login extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return  (
      <div>
      <NavBar />
      <main>
          <form>
            <h2>Log In</h2>
            <div>
              <input 
                className="input-field control" 
                type="text" 
                name="email" 
                placeholder="Email"
              />
            </div>
            <div>
              <input
                className="input-field control"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                className="btn btn-nature submitBtn"
                type="submit"  
                value="submit"
              />
            </div>

            <hr />
            <div className="center">
              <p>OR</p>
              <a href="" className="btn btn-google">Sign in with Google</a>
            </div>
            <div className="right formText">
              <p>No Account? <a href="signup.html">Sign Up</a> </p>
              <a href="#">Forgot your password?</a>
            </div>
          </form>
        </main>
      </div>
          );
  }
}