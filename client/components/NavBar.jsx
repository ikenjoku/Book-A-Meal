import React, { Component } from 'react';

export default class NavBar extends Component {
  constructor(props){
    super(props);  
  }

  burgerToggler(){
    let linksEl = document.querySelector('.narrowLinks');
    if (linksEl.style.display === 'block'){
      linksEl.style.display = 'none';
    } else {
      linksEl.style.display = 'block';
    }
  }

  render(){
    return (
    <nav>
      <div className='navWide'>
        <div className='wideDiv'>
          <a href="#">Book-A-Meal</a>
          <a href="#">Login</a>
          <a href="#">Signup</a>
        </div>
      </div>
      <div className='navNarrow'>
        <i className='fa fa-bars fa-2x' onClick={this.burgerToggler}></i>
          <div className="narrowLinks">
            <a href="#" onClick={this.burgerToggler}>Book-A-Meal</a>
            <a href="#" onClick={this.burgerToggler}>Login</a>
            <a href="#" onClick={this.burgerToggler}>Signup</a>
          </div>
      </div>
    </nav>
    );
  }
}