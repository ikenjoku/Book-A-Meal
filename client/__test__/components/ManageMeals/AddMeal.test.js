import React from 'react';
import { shallow } from "enzyme";
import { AddMealForm } from "../../../components/ManageMeals/AddMealForm";
import { meals } from "../../mocks";

let addAMeal, history, wrapper;

describe('AddMeal Component', () => {
  beforeEach(() => {
    addAMeal = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddMealForm addAMeal={addAMeal} history={history} />);
  });
  
  test('should render the AddMealForm correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('should handle onSubmit', () => {
    wrapper.find('MealForm').prop('onSubmit')(meals[1]);
    expect(addAMeal).toHaveBeenLastCalledWith(meals[1]);
    expect(history.push).toHaveBeenCalledWith('/meals');
  });
});
