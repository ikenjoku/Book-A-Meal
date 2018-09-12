import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import config from '../../axiosConfig';
import initialState from '../../reducers/initialState';
import * as mealActions from '../../actions/mealActions';
import * as actionTypes from '../../actions/actionTypes';

describe('mealActions', () => {
  // localStorage
  //   .setItem('BAMtoken', JSON.stringify({ token: '2ePZDiaX_7OZwWtF6WuPD8uwOnr2M' }));
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

  // it('creates GET_MEALS_FAILURE, GET_MEALS_LOADING_STATUS
  // when getPaginatedMeals is successful', () => {
  //   const limit = 5;
  //   const page = 2;
  //   const response = {
  //     message: 'Meals successfully retrieved',
  //     meals,
  //     pages: 5,
  //     count: 10,
  //   };
  //   mock.onGet(`${baseURL}/meals`)
  //     .reply(200, response);

  //   const expectedActions = [
  //     { type: actionTypes.GET_MEALS_LOADING_STATUS, status: true },
  //     { type: actionTypes.GET_PAGINATED_MEALS, response },
  //     { type: actionTypes.GET_MEALS_LOADING_STATUS, status: false },
  //   ];
  //   return store.dispatch(mealActions
  //     .getPaginatedMeals({ limit, page }))
  //     .then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  // });

  // it('creates GET_MEALS_FAILURE, GET_MEALS_LOADING_STATUS
  //  when getPaginatedMeals is not successful', () => {
  //   const limit = 5;
  //   const page = 2;
  //   const mealz = { rows: [], count: 9 };
  //   const error = { message: 'No meals found', meals: mealz.rows };

  //   mock.onGet(`${baseURL}/meals`)
  //     .reply(400, error);

  //   const expectedActions = [
  //     { type: actionTypes.GET_MEALS_LOADING_STATUS, status: true },
  //     { type: actionTypes.GET_MEALS_FAILURE, error },
  //     { type: actionTypes.GET_MEALS_LOADING_STATUS, status: false },
  //   ];
  //   return store.dispatch(mealActions
  //     .getPaginatedMeals({ limit, page }))
  //     .then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  // });

  it('creates ADD_MEAL_SUCCESS when addAMeal is successful', () => {
    const meal = { name: 'Moi Moi' };
    const response = {
      message: 'Successfully added meal',
      meal: { name: 'Moi Moi' },
    };
    mock.onPost(`${baseURL}/meals`)
      .reply(201, response);

    const expectedActions = [
      { type: actionTypes.ADD_MEAL_SUCCESS, meal },
    ];
    return store.dispatch(mealActions
      .addAMeal(meal))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates ADD_MEAL_FAILURE when addAMeal is not successful', () => {
    const meal = { name: 'Moi Moi' };
    const error = { message: 'Error adding meal' };
    mock.onPost(`${baseURL}/meals`)
      .reply(400, error);

    const expectedActions = [
      { type: actionTypes.ADD_MEAL_FAILURE, error },
    ];
    return store.dispatch(mealActions
      .addAMeal(meal))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_MEAL_SUCCESS when updateAMeal is successful', () => {
    const id = 2;
    const updatedMeal = { name: 'updatedMeal' };
    const response = {
      message: 'Successfully deleted meal',
      updatedMeal: { name: 'updatedMeal' },
    };
    mock.onPut(`${baseURL}/meals/2`)
      .reply(200, response);

    const expectedActions = [
      { type: actionTypes.UPDATE_MEAL_SUCCESS, id, updatedMeal },
    ];
    return store.dispatch(mealActions
      .updateAMeal(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_MEAL_FAILURE when updateAMeal is not successful', () => {
    const id = 2;
    const updates = { status: 'cancelled' };
    const error = { message: 'Error updating meal' };
    mock.onPut(`${baseURL}/meals/2`)
      .reply(400, error);

    const expectedActions = [
      { type: actionTypes.UPDATE_MEAL_FAILURE, error },
    ];
    return store.dispatch(mealActions
      .updateAMeal(id, updates))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates REMOVE_MEAL_SUCCESS when removeMeal is successful', () => {
    const id = 2;
    const response = { message: 'Successfully deleted meal' };
    mock.onDelete(`${baseURL}/meals/2`)
      .reply(200, response);

    const expectedActions = [
      { type: actionTypes.REMOVE_MEAL_SUCCESS, id },
    ];
    return store.dispatch(mealActions
      .removeAMeal(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates REMOVE_MEAL_FAILURE when removeMeal is not successful', () => {
    const id = 2;
    const error = { message: 'Error deleting meal' };
    mock.onDelete(`${baseURL}/meals/2`)
      .reply(400, error);

    const expectedActions = [
      { type: actionTypes.REMOVE_MEAL_FAILURE, error },
    ];
    return store.dispatch(mealActions
      .removeAMeal(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
