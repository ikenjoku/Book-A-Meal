import mealReducer from '../../reducers/mealReducer';
import initialState from '../../reducers/initialState';
import { meals, testMeal } from "../mocks";


test('should set default state', () => {
  const state = mealReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(initialState.mealReducer);
});

test('should get all meals', () => {
  const action = {
    type: 'GET_MEALS_SUCCESS',
    meals,
  }
  const state = mealReducer({meals}, action);
  expect(state).toEqual({meals});
});

test('should return error if getAllMeals request fails', () => {
  const action = {
    type: 'GET_MEALS_FAILURE',
    error: {status: 'error'},
  }
  const state = mealReducer({error: null}, action);
  expect(state).toEqual({error:{status: 'error'}});
});

test('should update loading status', () => {
  const action = {
    type: 'GET_MEALS_LOADING_STATUS',
    status: true,
  };
  const state = mealReducer({isLoading: false}, action);
  expect(state).toEqual({isLoading: true});
});

test('should update a meal given mealId and meal details', () => {
  const action = {
    type: 'UPDATE_MEAL_SUCCESS',
    id: 2,
    updatedMeal: testMeal,
  };
  const state = mealReducer({meals}, action);
  expect(state).toEqual({meals: [meals[0],meals[1],meals[3],meals[4], testMeal]});
});

test('should return error if updateMeals request fails', () => {
  const action = {
    type: 'UPDATE_MEAL_FAILURE',
    error: {status: 'error'},
  }
  const state = mealReducer({error: null}, action);
  expect(state).toEqual({error:{status: 'error'}});
});

test('should add a meal to meals array', () => {
  const action = {
    type: 'ADD_MEAL_SUCCESS',
    meal: testMeal,
  };
  const state = mealReducer({meals}, action);
  expect(state).toEqual({...state, meals:[...meals, testMeal]});
});

test('should return error if addMeals request fails', () => {
  const action = {
    type: 'ADD_MEAL_FAILURE',
    error: {status: 'error'},
  }
  const state = mealReducer({error: null}, action);
  expect(state).toEqual({error:{status: 'error'}});
});


test('should remove meal by id', () => {
  const action = {
    type: 'REMOVE_MEAL_SUCCESS',
    id: meals[1].id,
  };
  const state = mealReducer({meals}, action);
  expect(state).toEqual({meals: [meals[0],meals[2],meals[3],meals[4]]});
});

test('should return error if removeMeal request fails', () => {
  const action = {
    type: 'REMOVE_MEAL_FAILURE',
    error: {status: 'error'},
  }
  const state = mealReducer({error: null}, action);
  expect(state).toEqual({error:{status: 'error'}});
});

test('should return state if action is unknown', () => {
  const action = {
    type: 'AMA_BIG_BOY',
    error: {status: 'error'},
  }
  const state = mealReducer({meals}, action);
  expect(state).toEqual({meals});
});