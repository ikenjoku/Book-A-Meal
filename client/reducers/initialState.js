export default {
  authReducer: {
    authLoading: false,
    user: {},
    isLoggedIn: false,
  },
  mealReducer: {
    meals: [],
    error: null,
    isLoading: true,
  
  },
  menuReducer: {
    selectedMenu: null,
    error: null,
  
  },
  setMenuReducer: {
    createdMenu: null,
    selectedDate: '',
    error: null,
    success: false,
    updatedMenu: null,
  },
  orderReducer: {
    orderedMeal: null,
    error: null,
    meals: [],
  },
}