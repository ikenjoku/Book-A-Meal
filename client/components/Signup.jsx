import React from 'react';


export default class Signup extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="content">
            <form className="formDesign">
                <h2>Sign In</h2>
                <div>
                    <input 
                      className="input-field control"
                      type="text"
                      name="firstname" 
                      placeholder="First Name" 
                    />
                </div>
                <div>
                    <input 
                      className="input-field control" 
                      type="text" 
                      name="lastname" 
                      placeholder="Last Name" 
                    />
                </div>
                <div>
                    <input 
                      className="input-field control" 
                      type="text" 
                      name="username" 
                      placeholder="Preferred username" 
                    />
                </div>
                <div>
                    <input 
                      className="input-field control" 
                      type="email" 
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
                      class="input-field control" 
                      type="password" 
                      name="confirm-password" 
                      placeholder="Confirm password" 
                    />
                </div>
                <div>
                    <input 
                    type="submit" 
                    class="btn btn-nature submitBtn" 
                    value="submit" 
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
