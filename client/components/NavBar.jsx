import React, { Component } from 'react';

export default class NavBar extends Component {
  constructor(){
    super();  
  }

  render(){
    return <div>
      <a>Book-A-Meal</a>
      <div>
        <a>Login</a>
        <a>Signup</a>
      </div>
    </div>
  }
}