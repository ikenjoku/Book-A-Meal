import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import config from '../../../axiosConfig';
import initialState from '../../../reducers/initialState';
import * as logoutActions from '../../../actions/authActions/logout';
import * as actionTypes from '../../../actions/actionTypes';

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

  it('creates LOGOUT_SUCCESS when logoutAUser is successful', () => {
  //   const userId = 2;
  //   const response = { message: 'Successfully ordered meal', orders: [{ name: 'users orders' }] };
  //   mock.onGet(`${baseURL}/orders?userId=${userId}`)
  //     .reply(200, response);

  //   const expectedActions = { type: actionTypes.LOGOUT_SUCCESS };
  //   return store.dispatch(logoutActions
  //     .logoutAUser())
  //     .then(() => {
  //       expect(store.getActions()[0]).toEqual(expectedActions);
  //     });
  });
});
