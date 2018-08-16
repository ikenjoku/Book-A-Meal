import API from '../axiosConfig';
import notify from './notify';
import {
  ORDER_MEAL_SUCCESS, ORDER_MEAL_FAILURE,
  MODIFY_ORDER_SUCCESS, MODIFY_ORDER_FAILURE,
  CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
  GET_ORDERS_BY_DATE_SUCCESS, GET_ORDERS_BY_DATE_FAILURE,
  GET_ALL_PREVIOUS_ORDERS_SUCCESS, GET_ALL_PREVIOUS_ORDERS_FAILURE,
  DELIVER_ORDER_SUCCESS, DELIVER_ORDER_FAILURE,
  GET_ORDER_LOADING_STATUS, CHANGE_ORDER_STATUS,
} from './actionTypes';

const orderMealSuccess = ({ order, meal }) => ({
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

const deliverOrderSuccess = ({ deliveredOrder, id }) => ({
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

const modifyOrderSuccess = ({ modifiedOrder, id }) => ({
  type: MODIFY_ORDER_SUCCESS,
  modifiedOrder,
  id,
});

const modifyOrderFailure = error => ({
  type: MODIFY_ORDER_FAILURE,
  error,
});

const cancelOrderSuccess = ({ cancelledOrder, id }) => ({
  type: CANCEL_ORDER_SUCCESS,
  cancelledOrder,
  id,
});

const cancelOrderFailure = error => ({
  type: CANCEL_ORDER_FAILURE,
  error,
});

export const modifyOrderStatus = (status, orderId = '') => ({
  type: CHANGE_ORDER_STATUS,
  changeOrderStatus: status,
  orderIdToModify: orderId,
});

export const getAllPreviousOrders = userId => (dispatch) => {
  API.get(`/orders?userId=${userId}`)
    .then((res) => {
      dispatch(getPreviousOrdersSuccess(res.data.orders));
    })
    .catch((error) => {
      dispatch(getPreviousOrdersFailure(error));
    });
};

export const orderAMeal = ({ mealId, id, meal }) => (dispatch) => {
  API.post('/orders', { mealId, id })
    .then((res) => {
      dispatch(orderMealSuccess({ order: res.data.order, meal }));
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
  API.get(`/orders?date=${selectedDate}`)
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

export const deliverAnOrder = id => (dispatch) => {
  API.put(`/orders/${id}`, { status: 'delivered' })
    .then((res) => {
      dispatch(deliverOrderSuccess({ deliveredOrder: res.data.order, id }));
      notify.success(res.data.message);
    })
    .catch((error) => {
      dispatch(deliverOrderFailure(error));
      notify.error(error.response.data.message);
    });
};

export const cancelAnOrder = id => (dispatch) => {
  API.put(`/orders/${id}`, { status: 'cancelled' })
    .then((res) => {
      dispatch(cancelOrderSuccess({ cancelledOrder: res.data.order, id }));
      notify.success(res.data.message);
    })
    .catch((error) => {
      dispatch(cancelOrderFailure(error));
      notify.error(error.response.data.message);
    });
};

export const modifyAnOrder = ({ id, newMealId }) => (dispatch) => {
  API.put(`/orders/${id}`, { newMealId })
    .then((res) => {
      dispatch(modifyOrderSuccess({ modifiedOrder: res.data.order, id }));
      dispatch(getAllPreviousOrders());
      dispatch(modifyOrderStatus(false));
      notify.success(res.data.message);
    })
    .catch((error) => {
      dispatch(modifyOrderFailure(error));
      dispatch(modifyOrderStatus(false));
      notify.error(error.response.data.message);
    });
};
