import menuReducer from '../../reducers/menuReducer';
import initialState from '../../reducers/initialState';
import { menu} from "../mocks";


test('should set default state', () => {
  const state = menuReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(initialState.menuReducer);
});

test("should get a day's menu", () => {
  const action = {
    type: 'GET_MENU_SUCCESS',
    selectedMenu: menu,
  }
  const state = menuReducer({selectedMenu: null}, action);
  expect(state).toEqual({selectedMenu: menu, error: null});
});

test('should return error if getMenu request fails', () => {
  const action = {
    type: 'GET_MENU_FAILURE',
    error: {status: 'error'},
  }
  const state = menuReducer({error: null}, action);
  expect(state).toEqual({error:{status: 'error'}});
});

test('should return state if action is unknown', () => {
  const action = {
    type: 'AMA_BIG_BOY',
    error: {status: 'error'},
  }
  const state = menuReducer(undefined, action);
  expect(state).toEqual(initialState.menuReducer);
});