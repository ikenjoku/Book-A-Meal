import React from 'react';
import { shallow } from 'enzyme';
import { UpdateOrder, mapStateToProps } from '../../../components/Menu/UpdateOrder';
import initialState from '../../../reducers/initialState'
import { orders } from '../../mocks';

describe('UpdateOrder Component', () => {
  let wrapper, closeModal, orderToUpdate, updateAnOrder;
  orderToUpdate = orders[1];
  closeModal = jest.fn();
  updateAnOrder = jest.fn();

  test('should render UpdateOrder correctly', () => {
    wrapper = shallow(
      <UpdateOrder
      closeModal={closeModal}
      orderToUpdate={orderToUpdate}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleChange when input fields change value', () => {
      wrapper = shallow(
        <UpdateOrder
        closeModal={closeModal}
        orderToUpdate={orderToUpdate}
      />);

    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 4,
      }
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle order update', () => {
    wrapper = shallow(
      <UpdateOrder
      closeModal={closeModal}
      orderToUpdate={orderToUpdate}
      updateAnOrder={updateAnOrder}
    />);

  const handleUpdateOrderSpy = jest.spyOn(
    wrapper.instance(), 'handleUpdateOrder'
  );

  wrapper.instance().handleUpdateOrder();
  expect(handleUpdateOrderSpy).toHaveBeenCalledTimes(1);
});

  test('should map state to props', () => {
    const ownProps = { previousOrders: orders};
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
