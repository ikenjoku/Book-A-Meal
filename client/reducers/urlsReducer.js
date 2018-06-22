import { LOGIN_SUCCESS } from '../actions/actionTypes';

const initialState = {
  urls: [
    {
      id: 1,
      name: 'Login',
      link: 'login',
    },
    {
      id: 2,
      name: 'Signup',
      link: 'signup',
    },
  ],
};

const userUrls = [
  {
    id: 1,
    name: 'Menu',
    link: 'menu',
  },
  {
    id: 4,
    name: 'Logout',
    link: 'logout',
  },
];

const adminUrls = [
  {
    id: 1,
    name: 'Meals',
    link: 'meals',
  },
  {
    id: 2,
    name: 'Menu',
    link: 'menu',
  },
  {
    id: 3,
    name: 'Orders',
    link: 'order-history',
  },
  {
    id: 4,
    name: 'Create-Menu',
    link: 'set-menu',
  },
  {
    id: 5,
    name: 'Logout',
    link: 'logout',
  },
];

const urlsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.user.isAdmin === true ?
        adminUrls : userUrls;
    default:
      return state;
  }
};


export default urlsReducer;
