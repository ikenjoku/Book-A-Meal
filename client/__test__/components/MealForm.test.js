import React from 'react';
import { shallow } from 'enzyme';
import MealForm from '../../components/ManageMeals/MealForm';
import { meals } from '../mocks';


test('it should render the MealForm correctly', () => {
  const wrapper = shallow(<MealForm/>);
  expect(wrapper).toMatchSnapshot();
});

test('it should render the MealForm with data correctly', () => {
  const wrapper = shallow(<MealForm meal={meals[1]}/>);
  expect(wrapper).toMatchSnapshot();
})