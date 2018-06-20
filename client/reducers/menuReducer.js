import {
  GET_MENU_SUCCESS, GET_MENU_FAILURE,
} from '../actions/actionTypes';


const initialState = {
  selectedMenu: null,
  error: null,

};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU_SUCCESS:
      return {
        ...state,
        selectedMenu: action.selectedMenu,
      };
    case GET_MENU_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export default menuReducer;
