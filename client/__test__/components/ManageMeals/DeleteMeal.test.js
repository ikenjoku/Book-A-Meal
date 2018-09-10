import React from 'react';
import { shallow } from "enzyme";
import { DeleteMeal } from '../../../components/ManageMeals/DeleteMeal.jsx'
import { meals } from "../../mocks";


let wrapper, closeModal, removeAMeal;

describe('DeleteMeal Component', () => {
  beforeEach(() => {
    closeModal = jest.fn();
    removeAMeal = jest.fn();
    wrapper = shallow(<DeleteMeal meal={meals[0]} closeModal={closeModal} removeAMeal={removeAMeal} />);
  });

  test('should render the DeleteMeal correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should handle delete button', () => {
    wrapper.find('#confirm-delete-btn').simulate('click')
    expect(wrapper).toMatchSnapshot();
  });
});
