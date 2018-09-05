import authReducer from '../../reducers/authReducer';
import initialState from '../../reducers/initialState';
import { testUsers } from '../mocks';


test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(initialState.authReducer);
});

test('should update user on successful login', () => {
  const action = {
    type: 'LOGIN_SUCCESS',
    user: testUsers[1],
  };
  const state = authReducer({ user: {} }, action);
  expect(state).toEqual({ user: testUsers[1] });
});

test('should update user on successful signup', () => {
  const action = {
    type: 'SIGNUP_SUCCESS',
    user: testUsers[0],
  };
  const state = authReducer({ user: {} }, action);
  expect(state).toEqual({ user: testUsers[0] });
});

test('should update auth_loading status', () => {
  const action = {
    type: 'AUTH_LOADING',
    isLoading: true,
  };
  const state = authReducer({ authLoading: false }, action);
  expect(state).toEqual({ authLoading: true });
});

test('should update login status', () => {
  const action = {
    type: 'AUTH_LOGIN_STATUS',
    isLoggedIn: true,
  };
  const state = authReducer({ isLoggedIn: false }, action);
  expect(state).toEqual({ isLoggedIn: true });
});

test('should return error if login request fails', () => {
  const action = {
    type: 'LOGIN_FAILURE',
    error: { status: 'error' },
  };
  const state = authReducer({ error: null }, action);
  expect(state).toEqual({ error: { status: 'error' } });
});

test('should return error if signup request fails', () => {
  const action = {
    type: 'SIGNUP_FAILURE',
    error: { status: 'error' },
  };
  const state = authReducer({ error: null }, action);
  expect(state).toEqual({ error: { status: 'error' } });
});

test('should return state unchanged if action is unknown', () => {
  const action = {
    type: 'AMA_BIG_BOY',
    error: { status: 'error' },
  };
  const state = authReducer(initialState.authReducer, action);
  expect(state).toEqual(initialState.authReducer);
});
