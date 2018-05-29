import React, { Component } from 'react';

import NavBar from './NavBar';
import bgImg from '../static/bg-img.jpg';

const bgStyle = {
  backgroundImage: `url(${bgImg})`,
  height: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

export default class Landing extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
    <div style= { bgStyle }>
    <NavBar />
      <main className="mainContent" >
        <div id="welcomeContent">
          <h3>Welcome to Book-A-Meal</h3>
          <p>Rediscover local cuisine with a touch of delicious. Order hot homemade meals with a menu crafted just for you. We planned to satisfy your belly with all the good stuff.
          </p>
          <a id="enter-btn" className="btn menu-btn-nature" href="menu-list.html">Enter</a>
        </div>
      </main>
      <footer className="footer">
          <p>Book-A-Meal &copy;2018</p>
      </footer>
    </div>
    );
  }
}