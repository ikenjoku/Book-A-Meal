import {
  ORDER_MEAL_SUCCESS, ORDER_MEAL_FAILURE,
} from '../actions/actionTypes';


const initialState = {
  orderedMeal: null,
  error: null,
  meals: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_MEAL_SUCCESS:
      return {
        ...state,
        orderedMeal: action.orderedMeal,
        error: null,
      };

    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
