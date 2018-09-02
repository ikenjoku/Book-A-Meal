import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <h3>
    <p>Nothing here to see</p>
    <Link to="/">Go Home</Link>
  </h3>
);

export default NotFound;
