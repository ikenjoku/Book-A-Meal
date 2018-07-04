import API from '../axiosConfig';
import notify from "./notify";
import {
  ORDER_MEAL_SUCCESS, ORDER_MEAL_FAILURE,
  MODIFY_ORDER_SUCCESS, MODIFY_ORDER_FAILURE,
  CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
  GET_ORDERS_BY_DATE_SUCCESS, GET_ORDERS_BY_DATE_FAILURE,
  GET_ALL_PREVIOUS_ORDERS_SUCCESS, GET_ALL_PREVIOUS_ORDERS_FAILURE,
  DELIVER_ORDER_SUCCESS, DELIVER_ORDER_FAILURE,
  GET_ORDER_LOADING_STATUS,
} from './actionTypes';

// Actions

const orderMealSuccess = ({order, meal}) => ({
  type: ORDER_MEAL_SUCCESS,
  orderedMeal: order,
  meal,
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

const deliverOrderSuccess = ({deliveredOrder, id}) => ({
  type: DELIVER_ORDER_SUCCESS,
  deliveredOrder,
  id,
});

const deliverOrderFailure = error => ({
  type: DELIVER_ORDER_FAILURE,
  error,
});

const isLoadingOrders = status => ({
  type: GET_ORDER_LOADING_STATUS,
  isLoadingOrders: status,
});

const modifyOrderSuccess = ({deliveredOrder, id}) => ({
  type: MODIFY_ORDER_SUCCESS,
  deliveredOrder,
  id,
});

const modifyOrderFailure = error => ({
  type: MODIFY_ORDER_FAILURE,
  error,
});

const cancelOrderSuccess = ({deliveredOrder, id}) => ({
  type: CANCEL_ORDER_SUCCESS,
  deliveredOrder,
  id,
});

const cancelOrderFailure = error => ({
  type: CANCEL_ORDER_FAILURE,
  error,
});

// Action Creators
export const orderAMeal = ({mealId, id, meal}) => (dispatch) => {
  API.post('/orders', {mealId, id})
    .then((res) => {
      dispatch(orderMealSuccess({order:res.data.order, meal}));
      dispatch(getAllPreviousOrders());
      notify.success(res.data.message);
    })
    .catch((error) => {
      dispatch(orderMealFailure(error));
      notify.error(error.message);
    });
};

export const getOrdersByDate = ({ selectedDate }) => (dispatch) => {
  dispatch(isLoadingOrders(true));
  API.get(`/orders/date?date=${selectedDate}`)
    .then(({ data: { orders } }) => {
      dispatch(getOrdersSucces(orders));
      dispatch(isLoadingOrders(false));
    })
    .catch((error) => {
      dispatch(isLoadingOrders(false));
      dispatch(getOrdersFailure(error));
      notify.error(error.response.data.message);
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
};

export const deliverAnOrder = id => (dispatch) => {
  API.put(`/orders/${id}/deliver`)
    .then((res) => {
      dispatch(deliverOrderSuccess({deliveredOrder:res.data.order, id}));
      notify.success(res.data.message);
      console.log({deliveredOrder:res.data.order, id})
    })
    .catch((error) => {
      dispatch(deliverOrderFailure(error));
      notify.error(error.response.data.message);
    });
};