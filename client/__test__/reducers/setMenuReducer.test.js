import setMenuReducer from '../../reducers/setMenuReducer';
import initialState from '../../reducers/initialState';
import { createdMenu } from "../mocks";


test('should set default state', () => {
  const state = setMenuReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(initialState.setMenuReducer);
});

test("should create a day's menu", () => {
  const action = {
    type: 'SET_MENU_SUCCESS',
    createdMenu,
  }
  const state = setMenuReducer(initialState.setMenuReducer, action);
  expect(state).toEqual({
    createdMenu: createdMenu.newMenu,
    selectedDate: createdMenu.newMenu.date,
    error: null,
    success: true,
    updatedMenu: null,
    count: 0,
    isLoading: false,
    pages: 0,
    paginatedMeals: [],
  });
});

test('should return error if setMenu request fails', () => {
  const action = {
    type: 'SET_MENU_FAILURE',
    error: {status: 'error'},
  }
  const state = setMenuReducer({error: null}, action);
  expect(state).toEqual({error:{status: 'error'}});
});

test('should set the selected menu date', () => {
  const action = {
    type: 'SET_SELECTED_DATE',
    selectedDate: {selectedDate: '2018-07-02'},
  }
  const state = setMenuReducer({selectedDate: ''}, action);
  expect(state).toEqual({selectedDate:{selectedDate: '2018-07-02'}});
});

test("should create a day's menu", () => {
  const action = {
    type: 'ADD_MEAL_TO_MENU_SUCCESS',
    updatedMenu: createdMenu,
  }
  const state = setMenuReducer(initialState.setMenuReducer, action);
  expect(state).toEqual({
    updatedMenu: createdMenu,
    createdMenu: null,
    selectedDate: '',
    error: null,
    success: false,
    count: 0,
    isLoading: false,
    pages: 0,
    paginatedMeals: [],
   });
});

test('should return error if addMealToMenu request fails', () => {
  const action = {
    type: 'ADD_MEAL_TO_MENU_FAILURE',
    error: {status: 'error'},
  }
  const state = setMenuReducer({error: null}, action);
  expect(state).toEqual({error:{status: 'error'}});
});

test('should return state if action is unknown', () => {
  const action = {
    type: 'AMA_BIG_BOY',
    error: {status: 'error'},
  }
  const state = setMenuReducer(undefined, action);
  expect(state).toEqual(initialState.setMenuReducer);
});