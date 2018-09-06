import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Landing = props =>
  (
    <main className="mainContent landing" >
      <div id="welcomeContent">
        <h3>Welcome to Book-A-Meal</h3>
        <p>
          Rediscover local cuisine with a touch of delicious.
          Order hot homemade meals with a menu crafted just for you.
          We planned to satisfy your belly with all the good stuff.
        </p>
        <Link
          id="enter-btn"
          to={props.isLoggedIn ? '/menu' : '/login'}
          className="btn menu-btn-nature enter-btn"
        >
          Enter
        </Link>
      </div>
    </main>
  );

Landing.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ authReducer }) => ({
  isLoggedIn: authReducer.isLoggedIn,
});

export default connect(mapStateToProps, null)(Landing);
