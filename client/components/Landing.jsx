import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="mainContent landing" >
        <div id="welcomeContent">
          <h3>Welcome to Book-A-Meal</h3>
          <p>Rediscover local cuisine with a touch of delicious. Order hot homemade meals with a menu crafted just for you. We planned to satisfy your belly with all the good stuff.
          </p>
          <Link to={this.props.isLoggedIn ? "/menu" : "/login"} className="btn menu-btn-nature enter-btn">Enter</Link>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ authReducer }) => ({
  isLoggedIn: authReducer.isLoggedIn,
});

export default connect(mapStateToProps, null)(Landing);