import React from 'react';
import { shallow } from 'enzyme';
import { CancelOrder } from '../../../components/Menu/CancelOrder';

describe('Cancel Order Component', () => {
  let wrapper;
  const closeModal = jest.fn();
  const cancelAnOrder = jest.fn();
  const orderId = 3;

  test('it should render the MealForm correctly', () => {
    wrapper = shallow(<CancelOrder
      closeModal={closeModal}
      cancelAnOrder={cancelAnOrder}
      orderId={orderId}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should call cancel order action on click', () => {
    wrapper.find('#confirm-cancel-order').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
