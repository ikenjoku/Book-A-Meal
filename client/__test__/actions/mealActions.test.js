// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import moxios from 'moxios';
// import expect from 'expect';
// import { getAllMeals, addAMeal, removeAMeal, updateAMeal } from '../../actions/mealActions.js';
// import { getAllMealsMock } from '../mocks/mealMocks';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe('getAllMeals actions', () => {
//   beforeEach(() => {
//     moxios.install();
//   });

//   afterEach(() => {
//     moxios.uninstall();
//   });

//   it('creates GET_MEALS_SUCCESS after successfuly fetching meals', () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: getAllMealsMock,
//       });
//     });

//     const expectedActions = [
//       { type: 'GET_MEALS_SUCCESS',
//         meals: getAllMealsMock,
//       },
//     ];

//     const store = mockStore({ meals: {} });

//     return store.dispatch(getAllMeals()).then(() => {
//       // return of async actions
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

test('test meal actions', () => {

});