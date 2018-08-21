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
  // setMenuReducer: {
  //   createdMenu: null,
  //   selectedDate: '',
  //   success: false,
  //   updatedMenu: null,
  //   isLoading: false,
  //   paginatedMeals: [],
  //   count: 0,
  //   pages: 0,
  // },
  setupMenuReducer: {
    currentMenu: {},
    selectedDate: '',
    isLoadingMenu: false,
    error: null,
    meals: [],
    isUpdating: false,
    isFetching: false,
    isCreating: false,
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
