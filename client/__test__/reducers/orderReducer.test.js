import orderReducer from '../../reducers/orderReducer';
import initialState from '../../reducers/initialState';
import { testOrders, deliveredOrder } from '../mocks';


test('should set default state', () => {
  const state = orderReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(initialState.orderReducer);
});

test('should update ordered meal on successful order', () => {
  const action = {
    type: 'ORDER_MEAL_SUCCESS',
    orderedMeal: testOrders[0],
  };
  const state = orderReducer({ orderedMeal: null, orders: [], error: null }, action);
  expect(state).toEqual({
    orderedMeal: testOrders[0],
    orders: [],
    error: null,
  });
});

test('should get all orders for a day', () => {
  const action = {
    type: 'GET_ORDERS_BY_DATE_SUCCESS',
    orders: testOrders,
  };
  const state = orderReducer({ orders: [] }, action);
  expect(state).toEqual({
    orders: testOrders,
    error: null,
  });
});

test('should update error if get_orders request fails', () => {
  const action = {
    type: 'GET_ORDERS_BY_DATE_FAILURE',
    error: { status: 'error' },
  };
  const state = orderReducer({ error: null, orders: [] }, action);
  expect(state).toEqual({
    error: { status: 'error' },
    orders: [],
  });
});

test('should update previous orders on getting previous orders', () => {
  const action = {
    type: 'GET_ALL_PREVIOUS_ORDERS_SUCCESS',
    previousOrders: testOrders,
  };
  const state = orderReducer({ previousOrders: [] }, action);
  expect(state).toEqual({
    previousOrders: testOrders,
  });
});

test('should update error if getting previous orders request fails', () => {
  const action = {
    type: 'GET_ALL_PREVIOUS_ORDERS_FAILURE',
    error: { status: 'error' },
  };
  const state = orderReducer({ error: null }, action);
  expect(state).toEqual({
    error: { status: 'error' },
  });
});


test('should update orders when an order is delivered', () => {
  const action = {
    type: 'DELIVER_ORDER_SUCCESS',
    deliveredOrder: testOrders[1],
    id: 3,
  };
  const state = orderReducer({ orders: testOrders }, action);
  expect(state).toEqual({
    orders: [testOrders[0], testOrders[2], deliveredOrder],
  });
});

test('should update error if delivering order request fails', () => {
  const action = {
    type: 'DELIVER_ORDER_FAILURE',
    error: { status: 'error' },
  };
  const state = orderReducer({ error: null }, action);
  expect(state).toEqual({
    error: { status: 'error' },
  });
});

test('should update get_orders loading status', () => {
  const action = {
    type: 'GET_ORDER_LOADING_STATUS',
    isLoadingOrders: true,
  };
  const state = orderReducer({ isLoadingOrders: false }, action);
  expect(state).toEqual({ isLoadingOrders: true });
});

test('should remove cancelled orders from previous orders', () => {
  const action = {
    type: 'CANCEL_ORDER_SUCCESS',
    cancelledOrder: testOrders[1],
    id: 3,
  };
  const state = orderReducer({ previousOrders: testOrders }, action);
  expect(state).toEqual({ previousOrders: [testOrders[0], testOrders[2]] });
});

test('should return error if cancelling order request fails', () => {
  const action = {
    type: 'CANCEL_ORDER_FAILURE',
    error: { status: 'error' },
  };
  const state = orderReducer({ error: null }, action);
  expect(state).toEqual({ error: { status: 'error' } });
});

test('should return error if cancelling order request fails', () => {
  const action = {
    type: 'CHANGE_ORDER_STATUS',
    changeOrderStatus: true,
    orderIdToModify: 3,
  };
  const state = orderReducer({ changeOrderStatus: false, orderIdToModify: '' }, action);
  expect(state).toEqual({ changeOrderStatus: true, orderIdToModify: 3 });
});

test('should return state unchanged if action is unknown', () => {
  const action = {
    type: 'AMA_BIG_BOY',
    error: { status: 'error' },
  };
  const state = orderReducer(initialState.orderReducer, action);
  expect(state).toEqual(initialState.orderReducer);
});
