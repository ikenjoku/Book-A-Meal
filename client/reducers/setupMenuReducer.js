import {
  GET_A_MENU_SUCCESS, GET_A_MENU_FAILURE, GET_MENU_LOADING_STATUS,
} from '../actions/actionTypes';
import initialState from '../reducers/initialState';


const setupMenuReducer = (state = initialState.setupMenuReducer, action) => {
  switch (action.type) {
    case GET_A_MENU_SUCCESS:
      return {
        ...state,
        currentMenu: action.currentMenu,
        error: null,
      };
    case GET_A_MENU_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case GET_MENU_LOADING_STATUS:
      return { ...state, isLoadingMenu: action.status };
    default:
      return {
        ...state,
      };
  }
};

export default setupMenuReducer;
