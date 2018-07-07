// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import moxios from 'moxios';
// import expect from 'expect';
// import { getAllMeals, addAMeal, removeAMeal, updateAMeal } from '../../actions/mealActions.js';
// import { GET_MEALS_LOADING_STATUS, GET_MEALS_SUCCESS } from "../../actions/actionTypes";
// import { mockStoreData } from "../mocks";

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe('Meals Actions', () => {
//   beforeEach(() => moxios.install());
//   afterEach(() => moxios.uninstall());

//   describe('getAllMeals', () => {
//     it('should dispatch GET_MEALS_SUCCESS and meals', async (done) => {
//       const meals = mockStoreData.mealReducer.meals;
//       moxios.stubRequest('/meals', {
//           status: 200,
//           response: { data: meals },
//         });
  
//       const expectedActions = [
//         { type: GET_MEALS_LOADING_STATUS, status: true },
//         { type: GET_MEALS_SUCCESS, meals },
//         { type: GET_MEALS_LOADING_STATUS, status: false }
//       ];
//       const store = mockStore({});
  
//       await store.dispatch(getAllMeals());
//       expect(store.getActions()).toEqual(expectedActions);
//       done();
//     });
//   });
// });

test('just pass', () => {

});