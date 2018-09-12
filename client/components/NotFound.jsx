import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <h3 id="not-found">
    <p>Nothing to see here</p>
    <p>404</p>
    <Link to="/">Go Home</Link>
  </h3>
);

export default NotFound;
