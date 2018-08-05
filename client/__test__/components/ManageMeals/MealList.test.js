import React from 'react';
import { shallow } from "enzyme";
import { MealList } from "../../../components/ManageMeals/MealList";
import { mapStateToProps } from "../../../components/ManageMeals/MealList";
import initialState from "../../../reducers/initialState";

import { meals } from "../../mocks";

let props, wrapper;

beforeEach(() => {
    const paginatedMeals = meals,
  wrapper = shallow(<MealList getPaginatedMeals={jest.fn()} paginatedMeals={meals} props={props} />);
});

test('should render the MealList correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// it('should   map state to props correctly', () => {
//   const appState = {mealReducer: { meals }};
//   const ownProps = {
//     meals: [],
//     isLoading: false,
//   };

//   const componentState = mapStateToProps(appState, ownProps);
//   console.log(componentState)
//   expect(componentState).toEqual({ meals });

// })