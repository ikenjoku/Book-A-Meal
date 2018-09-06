import React from 'react';
import { ToastContainer } from 'react-toastify';

export default () => (
  <footer className="footer">
    <ToastContainer
      autoClose={15000}
      hideProgressBar={true}
      closeOnClick={true}
      pauseOnHover={false}
      closeButton={false}
      className="toast-container"
    />
    <p>Book-A-Meal &copy; 2018</p>
    <p>Designed by <a href="https://github.com/ikenjoku/Book-A-Meal" target="blank">Ikechukwu Njoku</a></p>
  </footer>
);
