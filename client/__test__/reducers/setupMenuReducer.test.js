import setupMenuReducer from '../../reducers/setupMenuReducer';
import initialState from '../../reducers/initialState';
import { menus, meals } from '../mocks';


test('should set default state', () => {
  const state = setupMenuReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(initialState.setupMenuReducer);
});

test('should get current menu', () => {
  const action = {
    type: 'FETCH_MENU_SUCCESS',
    currentMenu: menus[0],
  };
  const state = setupMenuReducer({ currentMenu: {}, error: null }, action);
  expect(state).toEqual({ currentMenu: menus[0], error: null });
});

test('should return error if get_menu request fails', () => {
  const action = {
    type: 'FETCH_MENU_FAILURE',
    error: { status: 'error' },
  };
  const state = setupMenuReducer({ error: null }, action);
  expect(state).toEqual({ error: { status: 'error' } });
});

test('should set newly created menu', () => {
  const action = {
    type: 'SET_MENU_SUCCESS',
    currentMenu: menus[1],
  };
  const state = setupMenuReducer({ currentMenu: {} }, action);
  expect(state).toEqual({ currentMenu: menus[1] });
});

test('should return error if set_menu request fails', () => {
  const action = {
    type: 'SET_MENU_FAILURE',
    error: { status: 'error' },
  };
  const state = setupMenuReducer({ error: null }, action);
  expect(state).toEqual({ error: { status: 'error' } });
});

test('should update created menu', () => {
  const action = {
    type: 'UPDATE_MENU_SUCCESS',
    currentMenu: menus[1],
  };
  const state = setupMenuReducer({ currentMenu: {} }, action);
  expect(state).toEqual({ currentMenu: menus[1] });
});

test('should return error if update_menu request fails', () => {
  const action = {
    type: 'UPDATE_MENU_FAILURE',
    error: { status: 'error' },
  };
  const state = setupMenuReducer({ error: null }, action);
  expect(state).toEqual({ error: { status: 'error' } });
});

test('should get meals', () => {
  const action = {
    type: 'GET_MEALS_SUCCESS',
    meals,
    count: 9,
    pages: 2,
  };
  const state = setupMenuReducer({ meals: [], count: 0, pages: 0, error: null }, action);
  expect(state).toEqual({ meals, count: 9, pages: 2, error: null });
});

test('should return error if get_meals request fails', () => {
  const action = {
    type: 'GET_MEALS_FAILURE',
    error: { status: 'error' },
  };
  const state = setupMenuReducer({ error: null }, action);
  expect(state).toEqual({ error: { status: 'error' } });
});

test('should set selected date', () => {
  const action = {
    type: 'SET_SELECTED_DATE',
    selectedDate: '2018-09-03',
  };
  const state = setupMenuReducer({ selectedDate: '' }, action);
  expect(state).toEqual({ selectedDate: '2018-09-03' });
});

test('should update get_menu loading status', () => {
  const action = {
    type: 'GET_MENU_LOADING_STATUS',
    status: true,
  };
  const state = setupMenuReducer({ isLoadingMenu: false }, action);
  expect(state).toEqual({ isLoadingMenu: true });
});

test('should update update_menu loading status', () => {
  const action = {
    type: 'UPDATE_MENU_LOADING_STATUS',
    status: true,
  };
  const state = setupMenuReducer({ isUpdating: false }, action);
  expect(state).toEqual({ isUpdating: true });
});

test('should update create_menu loading status', () => {
  const action = {
    type: 'CREATE_MENU_LOADING_STATUS',
    status: true,
  };
  const state = setupMenuReducer({ isCreating: false }, action);
  expect(state).toEqual({ isCreating: true });
});

test('should update get_meals loading status', () => {
  const action = {
    type: 'GET_MEALS_LOADING_STATUS',
    status: true,
  };
  const state = setupMenuReducer({ isFetching: false }, action);
  expect(state).toEqual({ isFetching: true });
});

test('should return state if action is unknown', () => {
  const action = {
    type: 'AMA_BIG_BOY',
    error: { status: 'error' },
  };
  const state = setupMenuReducer(initialState.setupMenuReducer, action);
  expect(state).toEqual(initialState.setupMenuReducer);
});
