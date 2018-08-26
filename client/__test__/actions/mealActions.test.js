// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import moxios from 'moxios';
// import expect from 'expect';
// import { getAllMeals, addAMeal, removeAMeal, updateAMeal } from '../../actions/mealActions.js';
// import { GET_MEALS_LOADING_STATUS, GET_MEALS_SUCCESS } from '../../actions/actionTypes';
// import { mockStoreData } from '../mocks';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe('Meals Actions', () => {
//   beforeEach(() => moxios.install());
//   afterEach(() => moxios.uninstall());

//   describe('getAllMeals', () => {
//     it('should dispatch GET_MEALS_SUCCESS and meals', (done) => {
//       const meals = mockStoreData.mealReducer.meals;
//       moxios.stubRequest('/meals', {
//         status: 200,
//         response: { data: meals },
//       });

//       const expectedActions = [
//         { type: GET_MEALS_LOADING_STATUS, status: true },
//         { type: GET_MEALS_SUCCESS, meals },
//         { type: GET_MEALS_LOADING_STATUS, status: false },
//       ];
//       const store = mockStore({});

//       store.dispatch(getAllMeals());
//       expect(store.getActions()).toEqual(expectedActions);
//       done();
//     });
//   });
// });


import expect from 'expect';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/mealActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe.only('Meals Actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should UPDATE_MEAL_SUCCESS on updateMeal action', () => {
    const response = { name: 'rice' };
    const id = 2;
    fetchMock
      .put(`/api/v1/meals/${id}`, { body: response });

    const expectedActions = [
      { type: types.UPDATE_MEAL_SUCCESS, id: 2, updatedMeal: response },
    ];
    const store = mockStore({});
    const updatedMeal = response;
    store.dispatch(actions.updateMeal({ id, updatedMeal }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

