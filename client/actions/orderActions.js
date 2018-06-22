import API from '../axiosConfig';
import {
  ORDER_MEAL_SUCCESS, ORDER_MEAL_FAILURE,
  MODIFY_ORDER_SUCCESS, MODIFY_ORDER_FAILURE,
  CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
  GET_ORDERS_BY_DATE_SUCCESS, GET_ORDERS_BY_DATE_FAILURE,
} from './actionTypes';

// Actions

const orderMealSuccess = mealId => ({
  type: ORDER_MEAL_SUCCESS,
  orderedMeal: mealId,
});

const getOrdersSucces = orders => ({
  type: GET_ORDERS_BY_DATE_SUCCESS,
  orders,
});

const getOrdersFailure = error => ({
  type: GET_ORDERS_BY_DATE_FAILURE,
  error,
});

// Action Creators
export const orderAMeal = mealId => (dispatch) => {
  API.get('/menu?date=2018-06-21')
    .then((res) => {
      dispatch(orderMealSuccess(mealId));
      console.log('ordering meal with id', mealId);
      // dispatch notification
    })
    .catch((error) => {
      // dispatch order meal error
    });
};

export const getOrdersByDate = ({ selectedDate }) => (dispatch) => {
  API.get(`/orders/date?date=${selectedDate}`)
    .then(({ data: { orders } }) => {
      console.log(orders);
      dispatch(getOrdersSucces(orders));
    })
    .catch((error) => {
      dispatch(getOrdersFailure(error));
    });
};
