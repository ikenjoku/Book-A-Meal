import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import config from '../../../axiosConfig';
import initialState from '../../../reducers/initialState';
import * as loginActions from '../../../actions/authActions/login';
import * as actionTypes from '../../../actions/actionTypes';

describe('menuActions', () => {
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

  it('creates LOGIN_FAILURE when loginAUser is not successful', () => {
    const loginData = { name: 'New userdata' };
    const error = { message: 'Error loggin in' };
    mock.onPost(`${baseURL}/auth/login`)
      .reply(400, error);

    const expectedActions = [
      { type: actionTypes.LOGIN_FAILURE, error },
    ];
    return store.dispatch(loginActions
      .loginAUser(loginData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
