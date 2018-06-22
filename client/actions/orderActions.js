import API from '../axiosConfig';
import {
  ORDER_MEAL_SUCCESS, ORDER_MEAL_FAILURE,
  MODIFY_ORDER_SUCCESS, MODIFY_ORDER_FAILURE,
  CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
} from './actionTypes';

// Actions

const orderMealSuccess = mealId => ({
  type: ORDER_MEAL_SUCCESS,
  orderedMeal: mealId,
});




// Action Creators
export const orderAMeal = (mealId) => (dispatch) => {
  API.get(`/menu?date=2018-06-21`)
    .then((res) => {
      dispatch(orderMealSuccess(mealId));
      console.log('ordering meal with id', mealId);
      // dispatch notification
    })
    .catch((error) => {
      dispatch(getMenuFailure(error));
    });
};

