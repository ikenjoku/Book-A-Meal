
export const meals = [
  {
    id: 0,
    name: 'Nigerian Jollof',
    description: 'Max Jollof rice, plantain, grilled turkey, bellefull Coke',
    price: 1100,
    imageurl: 'https://africa-publicmages/products/80/80418_1465475724_ma.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    name: 'Rice and Beans',
    description: 'Rice, Beans, Plantain, Panla Sauce, Max Coke',
    price: 1500,
    imageurl: 'https://africa-g/images/products/80/80418_1465475724_ma.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Egusi Semo',
    description: 'Semolina, Egusi Soup, Meat, Extra',
    price: 1200,
    imageurl: 'https://africa-public.food.jcts/80/80418_1465475724_ma.jpg',
  },
  {
    id: 3,
    name: 'Green Calulu',
    description: 'Chicken salad with extra cabbage',
    price: 1250,
    imageurl: 'https://dynamic/production/ng/images/products/80/_ma.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: 'Onion Jappatti',
    description: 'Ingera palate with raw meat sauce',
    price: 2200,
    imageurl: 'https://dynamic/production/ng/images/produc475724_ma.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const testMeal = {
  id: 3234,
  name: 'Strawberry flakes',
  description: 'Ingera palate with raw meat sauce',
  price: 2200,
  imageurl: 'https://dynamic/prodg/images/produc475724_ma.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockStoreData = {
  authReducer: {
    authLoading: true,
    user: {},
    isLoggedIn: false,
    error: null,
  },
  mealReducer: {
    meals: [
      {
        id: 3,
        name: 'Green Calulu',
        description: 'Chicken salad with extra cabbage',
        price: 1250,
        imageurl: 'https://dynamic/production/ng/images/products/80/_ma.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Onion Jappatti',
        description: 'Ingera palate with raw meat sauce',
        price: 2200,
        imageurl: 'https://dynamic/production/ng/images/produc475724_ma.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    error: null,
    isLoading: false,

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
    orders: [],
    previousOrders: [],
    isLoadingOrders: false,
  },
};

export const createdMenu = {
  message: 'Menu for 2018-06-15 was successfully created',
  newMenu: {
    id: 24,
    date: '2018-06-15',
    updatedAt: '2018-07-02T17:37:46.023Z',
    createdAt: '2018-07-02T17:37:46.023Z',
  },
};

export const menus = [{
  id: 23,
  date: '2018-07-02',
  createdAt: '2018-07-01T23:56:23.508Z',
  updatedAt: '2018-07-01T23:56:23.508Z',
  Meals: [
    {
      id: 31,
      name: 'Beans and Bread',
      price: 800,
      description: 'Heavily loaded with smoked fish.',
      imageurl: 'https://res.cloudinary.com/ikeenjoku/image/upload/v1529133645/bookameal/2018-06-16T07:20:43.822ZVegetablerice%2Bplantain%2Bgoatmeat%2Bcoke.jpg.jpg',
      MealMenu: {
        mealId: 31,
        menuId: 23,
        createdAt: '2018-07-01T23:56:28.012Z',
        updatedAt: '2018-07-01T23:56:28.012Z',
      },
    },
    {
      id: 34,
      name: 'Fish balls soup',
      price: 1200,
      description: 'Deliciously light soup with white fish balls',
      imageurl: 'https://res.cloudinary.com/ikeenjoku/image/upload/v1529134583/bookameal/2018-06-16T07:36:22.300Zassortedmeat.jpg.jpg',
      MealMenu: {
        mealId: 34,
        menuId: 23,
        createdAt: '2018-07-01T23:56:32.313Z',
        updatedAt: '2018-07-01T23:56:32.313Z',
      },
    },
    {
      id: 30,
      name: 'Beef with veggie soup',
      price: 1150,
      description: 'Stir fried sliced beef with premium vegetables and spices',
      imageurl: 'https://res.cloudinary.com/ikeenjoku/image/upload/v1529136037/bookameal/2018-06-16T08:00:34.302ZUgwu-Archi.jpg.jpg',
      MealMenu: {
        mealId: 30,
        menuId: 23,
        createdAt: '2018-07-01T23:56:36.920Z',
        updatedAt: '2018-07-01T23:56:36.920Z',
      },
    },
  ],
},
{
  id: 24,
  date: new Date().toISOString().substr(0, 10),
  createdAt: '2018-07-01T23:56:23.508Z',
  updatedAt: '2018-07-01T23:56:23.508Z',
  Meals: [
    {
      id: 31,
      name: 'Beans and Bread',
      price: 800,
      description: 'Heavily loaded with smoked fish.',
      imageurl: 'https://res.cloudinary.com/ikeenjoku/image/upload/v1529133645/bookameal/2018-06-16T07:20:43.822ZVegetablerice%2Bplantain%2Bgoatmeat%2Bcoke.jpg.jpg',
      MealMenu: {
        mealId: 31,
        menuId: 23,
        createdAt: '2018-07-01T23:56:28.012Z',
        updatedAt: '2018-07-01T23:56:28.012Z',
      },
    },
    {
      id: 34,
      name: 'Fish balls soup',
      price: 1200,
      description: 'Deliciously light soup with white fish balls',
      imageurl: 'https://res.cloudinary.com/ikeenjoku/image/upload/v1529134583/bookameal/2018-06-16T07:36:22.300Zassortedmeat.jpg.jpg',
      MealMenu: {
        mealId: 34,
        menuId: 23,
        createdAt: '2018-07-01T23:56:32.313Z',
        updatedAt: '2018-07-01T23:56:32.313Z',
      },
    },
    {
      id: 30,
      name: 'Beef with veggie soup',
      price: 1150,
      description: 'Stir fried sliced beef with premium vegetables and spices',
      imageurl: 'https://res.cloudinary.com/ikeenjoku/image/upload/v1529136037/bookameal/2018-06-16T08:00:34.302ZUgwu-Archi.jpg.jpg',
      MealMenu: {
        mealId: 30,
        menuId: 23,
        createdAt: '2018-07-01T23:56:36.920Z',
        updatedAt: '2018-07-01T23:56:36.920Z',
      },
    },
  ],
}];

export const orders = [
  {
    id: 2,
    date: '2018-05-16',
    amount: 1500,
    userId: 1,
    mealId: 2,
    status: 'cancelled',
    createdAt: '2018-05-23T19:56:44.346Z',
    updatedAt: '2018-05-23T19:56:44.346Z',
    User: {
      id: 1,
      firstname: 'Ezinne',
      lastname: 'Njoku',
    },
    Meal: {
      id: 2,
      name: 'Rice and Beans',
      price: 1500,
    },
  },
  {
    id: 3,
    date: '2018-05-16',
    amount: 1200,
    userId: 2,
    mealId: 3,
    status: 'pending',
    createdAt: '2018-05-23T19:56:44.346Z',
    updatedAt: '2018-05-23T19:56:44.346Z',
    User: {
      id: 2,
      firstname: 'Kelechi',
      lastname: 'Njoku',
    },
    Meal: {
      id: 3,
      name: 'Egusi Semo',
      price: 1200,
    },
  },
  {
    id: 4,
    date: '2018-05-16',
    amount: 1500,
    userId: 3,
    mealId: 3,
    status: 'delivered',
    createdAt: '2018-05-23T19:56:44.346Z',
    updatedAt: '2018-05-23T19:56:44.346Z',
    User: {
      id: 3,
      firstname: 'Nnamdi',
      lastname: 'James',
    },
    Meal: {
      id: 3,
      name: 'Egusi Semo',
      price: 1200,
    },
  },
];
