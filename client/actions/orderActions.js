import API from '../axiosConfig';
import notify from "./notify";
import {
  ORDER_MEAL_SUCCESS, ORDER_MEAL_FAILURE,
  MODIFY_ORDER_SUCCESS, MODIFY_ORDER_FAILURE,
  CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
  GET_ORDERS_BY_DATE_SUCCESS, GET_ORDERS_BY_DATE_FAILURE,
  GET_ALL_PREVIOUS_ORDERS_SUCCESS, GET_ALL_PREVIOUS_ORDERS_FAILURE,
} from './actionTypes';

// Actions

const orderMealSuccess = order => ({
  type: ORDER_MEAL_SUCCESS,
  orderedMeal: order,
});

const orderMealFailure = error => ({
  type: ORDER_MEAL_FAILURE,
  error,
});

const getOrdersSucces = orders => ({
  type: GET_ORDERS_BY_DATE_SUCCESS,
  orders,
});

const getOrdersFailure = error => ({
  type: GET_ORDERS_BY_DATE_FAILURE,
  error,
});

const getPreviousOrdersSuccess = orders => ({
  type: GET_ALL_PREVIOUS_ORDERS_SUCCESS,
  previousOrders: orders,
});

const getPreviousOrdersFailure = error => ({
  type: GET_ALL_PREVIOUS_ORDERS_FAILURE,
  error,
});

// Action Creators
export const orderAMeal = ({mealId, id}) => (dispatch) => {
  API.post('/orders', {mealId, id})
    .then((res) => {
      dispatch(orderMealSuccess(res.data.order));
      notify.success(res.data.message);
    })
    .catch((error) => {
      dispatch(orderMealFailure(error));
      notify.error(error.message);
    });
};

export const getOrdersByDate = ({ selectedDate }) => (dispatch) => {
  API.get(`/orders/date?date=${selectedDate}`)
    .then(({ data: { orders } }) => {
      dispatch(getOrdersSucces(orders));
    })
    .catch((error) => {
      dispatch(getOrdersFailure(error));
      notify.error(error.message);
    });
};

export const getAllPreviousOrders = () => (dispatch) => {
  API.get('/orders/customer')
  .then((res) => {
    dispatch(getPreviousOrdersSuccess(res.data.orders));
    console.log(res.data);
  })
  .catch((error) => {
    dispatch(getPreviousOrdersFailure(error));
  })
}