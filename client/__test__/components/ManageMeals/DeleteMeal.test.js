import React from 'react';
import { shallow } from "enzyme";
import { DeleteMeal } from '../../../components/ManageMeals/DeleteMeal.jsx'


let wrapper;

describe.only('AddMeal Component', () => {
  beforeEach(() => {
    wrapper = shallow(<DeleteMeal />);
  });

  test('should render the DeleteMeal correctly', () => {
    wrapper.find('#confirm-delete-btn').simulate('click')
    expect(wrapper).toMatchSnapshot();
  });
});