import {
  ORDER_MEAL_SUCCESS, ORDER_MEAL_FAILURE,
  GET_ORDERS_BY_DATE_SUCCESS, GET_ORDERS_BY_DATE_FAILURE,
  GET_ALL_PREVIOUS_ORDERS_SUCCESS, GET_ALL_PREVIOUS_ORDERS_FAILURE,
  DELIVER_ORDER_SUCCESS, DELIVER_ORDER_FAILURE,
  GET_ORDER_LOADING_STATUS,
} from '../actions/actionTypes';
import initialState from './initialState';


const orderReducer = (state = initialState.orderReducer, action) => {
  let orders;
  let deliveredOrder;
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
        orders: []
      };
    case GET_ALL_PREVIOUS_ORDERS_SUCCESS:
      return {
        ...state,
        previousOrders: [...action.previousOrders],
      };
    case GET_ALL_PREVIOUS_ORDERS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
      case DELIVER_ORDER_SUCCESS:
      orders = state.orders.filter(order => order.id !== action.id);
      deliveredOrder = state.orders.find(order => order.id === action.id);
      deliveredOrder = {...deliveredOrder, status: 'delivered'}
      return { ...state, orders: [...orders, deliveredOrder] };
    case DELIVER_ORDER_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case GET_ORDER_LOADING_STATUS:
    return {
      ...state,
      isLoadingOrders: action.isLoadingOrders
    }
    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
