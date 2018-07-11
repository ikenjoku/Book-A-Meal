import React from 'react';
import { shallow } from "enzyme";
import { EditMealForm } from "../../../components/ManageMeals/EditMealForm";
import { meals } from "../../mocks";

let updateAMeal, history, wrapper;

beforeEach(() => {
  updateAMeal = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<EditMealForm meal={meals[2]} updateAMeal={updateAMeal} history={history} />);
});

test('should render the EditMealForm correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('MealForm').prop('onSubmit')(meals[2]);
  expect(updateAMeal).toHaveBeenLastCalledWith(2, meals[2]);
  expect(history.push).toHaveBeenCalledWith('/meals');
});