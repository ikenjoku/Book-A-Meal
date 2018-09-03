import React from 'react';
import { shallow } from 'enzyme';
import { meals } from '../../mocks';
import { AddMealForm } from '../../../components/ManageMeals/AddMealForm';

let addAMeal;
let history;
let wrapper;

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
