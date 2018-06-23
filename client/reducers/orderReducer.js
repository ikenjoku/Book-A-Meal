import {
  ORDER_MEAL_SUCCESS, ORDER_MEAL_FAILURE,
  GET_ORDERS_BY_DATE_SUCCESS, GET_ORDERS_BY_DATE_FAILURE,
} from '../actions/actionTypes';
import initialState from './initialState';


const orderReducer = (state = initialState.orderReducer, action) => {
  switch (action.type) {
    case ORDER_MEAL_SUCCESS:
      return {
        ...state,
        orderedMeal: action.orderedMeal,
        error: null,
      };
    case GET_ORDERS_BY_DATE_SUCCESS:
      return {
        ...state,
        orders: [...action.orders],
        error: null,
      };
    case GET_ORDERS_BY_DATE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
