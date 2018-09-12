import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import config from '../../axiosConfig';
import initialState from '../../reducers/initialState';
import * as menuActions from '../../actions/menuActions';
import * as actionTypes from '../../actions/actionTypes';

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

  it('creates GET_MENU_SUCCESS when getAMenu is successful', () => {
    const menu = { name: 'New Menu' };
    const selectedDate = '2018-09-09';
    const response = {
      menu: { name: 'New Menu' },
    };
    mock.onGet(`${baseURL}/menu?date=2018-09-09`)
      .reply(200, response);

    const expectedActions = [
      { type: actionTypes.GET_MENU_SUCCESS, selectedMenu: menu },
    ];
    return store.dispatch(menuActions
      .getAMenu({ selectedDate }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_MENU_FAILURE when getAMenu is not successful', () => {
    const selectedDate = '2018-09-09';
    const error = { message: 'Error getting menul' };
    mock.onGet(`${baseURL}/menu?date=2018-09-09`)
      .reply(400, error);

    const expectedActions = [
      { type: actionTypes.GET_MENU_FAILURE, error },
    ];
    return store.dispatch(menuActions
      .getAMenu({ selectedDate }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
