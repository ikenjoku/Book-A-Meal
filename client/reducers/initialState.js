export default {
  authReducer: {
    authLoading: true,
    user: {},
    isLoggedIn: false,
    error: null,
  },
  mealReducer: {
    meals: [],
    error: null,
    isLoading: false,
    paginatedMeals: [],
    count: 0,
    pages: 0,

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
    isLoading: false,
    paginatedMeals: [],
    count: 0,
    pages: 0,
  },
  orderReducer: {
    orderedMeal: null,
    error: null,
    meals: [],
    orders: [],
    previousOrders: [],
    isLoadingOrders: false,
    changeOrderStatus: false,
    orderIdToModify: '',
  },
};
