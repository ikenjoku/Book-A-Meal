import { createStore, combineReducers } from 'redux';


const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
});

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});

const resetCount = ({ setCount }) => ({
  type: 'RESET',
  setCount,
});

const addExpense = ({ description, amount }) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: Math.floor(Math.random() * 20),
    description,
    amount,
  },
});

const removeExpense = ({ id }) => {
  return {
    type: 'REMOVE_EXPENSE',
    id,
  }
}

const defaultCount = { count: 0 };

const countReducer = (state = defaultCount, action) => {
  switch (action.type) {
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy,
      };
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy,
      };
    case 'RESET':
      return {
        count: action.setCount,
      };
    default:
      return state;
  }
};

const defaultExpenses = [];

const expenseReducer = (state = defaultExpenses, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense,
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(expense => expense.id !== action.id);
    default:
      return state;
  }
};


const store = createStore(combineReducers({
  count: countReducer,
  expenses: expenseReducer,
}));

store.subscribe(() => {
  console.log(store.getState());
});
// console.log(store.getState());

// ACTION

const expenOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
store.dispatch(addExpense({ description: 'Rent', amount: 100 }));

console.log(expenOne);

store.dispatch(removeExpense({ id: expenOne.expense.id }));


// store.dispatch(decrementCount({ decrementBy: 4 }));

// store.dispatch(incrementCount({ incrementBy: 2 }));

// store.dispatch(resetCount({ setCount: 101 }));


// ADD_MEAL
// UPDATE_MEAL
// DELETE_MEAL

// ORDER_ MEAL
// UPDATE_ORDER_MEAL
// CANCEL_ORDER_MEAL

// DELIVER A MEAL

