import React from 'react';
import { shallow } from 'enzyme';
import { meals } from '../../mocks';
import { DeleteMeal } from '../../../components/ManageMeals/DeleteMeal';


let wrapper;
let closeModal;
let removeAMeal;

describe('DeleteMeal Component', () => {
  beforeEach(() => {
    closeModal = jest.fn();
    removeAMeal = jest.fn();
    wrapper = shallow(<DeleteMeal
      meal={meals[0]}
      closeModal={closeModal}
      removeAMeal={removeAMeal}
    />);
  });

  test('should render the DeleteMeal correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should handle delete button', () => {
    wrapper.find('#confirm-delete-btn').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
