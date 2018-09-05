import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import config from '../../axiosConfig';
import initialState from '../../reducers/initialState';
import * as orderActions from '../../actions/orderActions';
import * as actionTypes from '../../actions/actionTypes';

describe('mealActions', () => {
  let store;
  const baseURL = 'http://localhost:9000/api/v1';
  const mock = new MockAdapter(config);
  beforeAll(() => {
    const mockStore = configureMockStore([thunk]);
    store = mockStore(initialState);
  });
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_ALL_PREVIOUS_ORDERS_SUCCESS when getAllPreviousOrders is successful', () => {
    const userId = 2;
    const orders = [{ name: 'users orders' }];
    const response = { message: 'Successfully ordered meal', orders: [{ name: 'users orders' }] };
    mock.onGet(`${baseURL}/orders?userId=${userId}`)
      .reply(200, response);

    const expectedActions = { type: actionTypes.GET_ALL_PREVIOUS_ORDERS_SUCCESS, previousOrders: orders };
    return store.dispatch(orderActions
      .getAllPreviousOrders(userId))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      });
  });

  it('creates GET_ALL_PREVIOUS_ORDERS_FAILURE when getAllPreviousOrders is not successful', () => {
    const userId = 2;
    const error = { message: 'Error getting orders' };
    mock.onGet(`${baseURL}/orders?userId=${userId}`)
      .reply(400, error);

    const expectedActions = { type: actionTypes.GET_ALL_PREVIOUS_ORDERS_FAILURE, error };
    return store.dispatch(orderActions
      .getAllPreviousOrders(userId))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      });
  });

  it('creates ORDER_MEAL_SUCCESS when orderAMeal is successful', () => {
    const userId = 2;
    const mealId = 2;
    const quantity = 3;
    const order = { name: 'ordered order' };
    const response = { message: 'Successfully ordered meal', order: { name: 'ordered order' } };
    mock.onPost(`${baseURL}/orders`)
      .reply(200, response);

    const expectedActions = { type: actionTypes.ORDER_MEAL_SUCCESS, orderedMeal: order };
    return store.dispatch(orderActions
      .orderAMeal({ mealId, quantity, userId }))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      });
  });

  it('creates ORDER_MEAL_FAILURE when orderAMeal is not successful', () => {
    const userId = 2;
    const mealId = 2;
    const quantity = 3;
    const error = { message: 'Error ordering meal' };
    mock.onPost(`${baseURL}/orders`)
      .reply(400, error);

    const expectedActions = { type: actionTypes.ORDER_MEAL_FAILURE, error };
    return store.dispatch(orderActions
      .orderAMeal({ mealId, quantity, userId }))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      });
  });

  // it('creates GET_ORDERS_BY_DATE_SUCCESS when getOrdersByDate is successful', () => {
  //   const selectedDate = '2018-09-09';
  //   const orders = [{ name: 'orders' }];
  //   const response = { message: 'Orders retrieved successfully', orders: [{ name: 'orders' }] };
  //   mock.onGet(`${baseURL}/orders/2`)
  //     .reply(200, response);

  //   const expectedActions = [
  //     { type: actionTypes.GET_ORDER_LOADING_STATUS, isLoadingOrders: true },
  //     { type: actionTypes.GET_ORDERS_BY_DATE_SUCCESS, orders },
  //     { type: actionTypes.GET_ORDER_LOADING_STATUS, isLoadingOrders: false },
  //   ];
  //   return store.dispatch(orderActions
  //     .getOrdersByDate({ selectedDate }))
  //     .then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  // });

  // it('creates GET_ORDERS_BY_DATE_FAILURE when getOrdersByDate is not successful', () => {
  //   const selectedDate = '2018-09-09';
  //   const error = { message: 'Error delivering meal' };
  //   mock.onGet(`${baseURL}/orders/2`)
  //     .reply(400, error);

  //   const expectedActions = { type: actionTypes.GET_ORDERS_BY_DATE_FAILURE, error };
  //   return store.dispatch(orderActions
  //     .getOrdersByDate({ selectedDate }))
  //     .then(() => {
  //       expect(store.getActions()[1]).toEqual(expectedActions);
  //     });
  // });

  it('creates DELIVER_ORDER_SUCCESS when deliverAnOrder is successful', () => {
    const id = 2;
    const deliveredOrder = { name: 'delivered order' };
    const response = { message: 'Successfully updated meal', order: { name: 'delivered order' } };
    mock.onPut(`${baseURL}/orders/2`)
      .reply(200, response);

    const expectedActions = { type: actionTypes.DELIVER_ORDER_SUCCESS, deliveredOrder, id };
    return store.dispatch(orderActions
      .deliverAnOrder(id))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      });
  });

  it('creates DELIVER_ORDER_FAILURE when deliverAnOrder is not successful', () => {
    const id = 2;
    const error = { message: 'Error delivering meal' };
    mock.onPut(`${baseURL}/orders/2`)
      .reply(400, error);

    const expectedActions = { type: actionTypes.DELIVER_ORDER_FAILURE, error };
    return store.dispatch(orderActions
      .deliverAnOrder(id))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      });
  });

  it('creates CANCEL_ORDER_SUCCESS when modifyAnOrder is successful', () => {
    const id = 2;
    const cancelledOrder = { name: 'cancelled order' };
    const response = { message: 'Successfully updated meal', order: { name: 'cancelled order' } };
    mock.onPut(`${baseURL}/orders/2`)
      .reply(200, response);

    const expectedActions = { type: actionTypes.CANCEL_ORDER_SUCCESS, cancelledOrder, id };
    return store.dispatch(orderActions
      .cancelAnOrder(id))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      });
  });

  it('creates CANCEL_ORDER_FAILURE when modifyAnOrder is not successful', () => {
    const id = 2;
    const error = { message: 'Error cancelling meal' };
    mock.onPut(`${baseURL}/orders/2`)
      .reply(400, error);

    const expectedActions = { type: actionTypes.CANCEL_ORDER_FAILURE, error };
    return store.dispatch(orderActions
      .cancelAnOrder(id))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      });
  });

  it('creates MODIFY_ORDER_SUCCESS when modifyAnOrder is successful', () => {
    const id = 2;
    const newMealId = 2;
    const modifiedOrder = { name: 'updated order' };
    const response = { message: 'Successfully updated meal', order: { name: 'updated order' } };
    mock.onPut(`${baseURL}/orders/2`)
      .reply(200, response);

    const expectedActions = { type: actionTypes.MODIFY_ORDER_SUCCESS, modifiedOrder, id };
    return store.dispatch(orderActions
      .modifyAnOrder({ id, newMealId }))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      });
  });

  it('creates CHANGE_ORDER_STATUS when modifyAnOrder is not successful', () => {
    const id = 2;
    const newMealId = 2;
    const error = { message: 'Error updating meal' };
    mock.onPut(`${baseURL}/orders/2`)
      .reply(400, error);

    const expectedActions = [
      { type: actionTypes.MODIFY_ORDER_FAILURE, error },
      { type: actionTypes.CHANGE_ORDER_STATUS, changeOrderStatus: false, orderIdToModify: '' },
    ];
    return store.dispatch(orderActions
      .modifyAnOrder({ id, newMealId }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates MODIFY_ORDER_SUCCESS when updateAnOrder is successful', () => {
    const id = 2;
    const quantity = 2;
    const amount = 2300;
    const userId = 2;
    const modifiedOrder = { name: 'updated order' };
    const response = { message: 'Successfully updated meal', order: { name: 'updated order' } };
    mock.onPut(`${baseURL}/orders/2`)
      .reply(200, response);

    const expectedActions = { type: actionTypes.MODIFY_ORDER_SUCCESS, modifiedOrder, id };
    return store.dispatch(orderActions
      .updateAnOrder({ id, quantity, amount, userId }))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions);
      });
  });

  it('creates CHANGE_ORDER_STATUS when updateAnOrder is not successful', () => {
    const id = 2;
    const quantity = 2;
    const amount = 2300;
    const userId = 2;
    const error = { message: 'Error updating meal' };
    mock.onPut(`${baseURL}/orders/2`)
      .reply(400, error);

    const expectedActions = [
      { type: actionTypes.MODIFY_ORDER_FAILURE, error },
      { type: actionTypes.CHANGE_ORDER_STATUS, changeOrderStatus: false, orderIdToModify: '' },
    ];
    return store.dispatch(orderActions
      .updateAnOrder({ id, quantity, amount, userId }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
