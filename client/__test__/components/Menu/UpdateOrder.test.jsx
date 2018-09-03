import React from 'react';
import { shallow } from 'enzyme';
import { testOrder, orders } from '../../mocks';
import initialState from '../../../reducers/initialState';
import { UpdateOrder, mapStateToProps } from '../../../components/Menu/UpdateOrder';

describe('UpdateOrder Component', () => {
  let wrapper;
  const orderToUpdate = testOrder;
  const closeModal = jest.fn();
  const updateAnOrder = jest.fn();

  test('should render UpdateOrder correctly', () => {
    wrapper = shallow(<UpdateOrder
      closeModal={closeModal}
      orderToUpdate={orderToUpdate}
      updateAnOrder={updateAnOrder}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleChange when input fields change value', () => {
    wrapper = shallow(<UpdateOrder
      closeModal={closeModal}
      orderToUpdate={orderToUpdate}
      updateAnOrder={updateAnOrder}
    />);

    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 4,
      },
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle order update', () => {
    wrapper = shallow(<UpdateOrder
      closeModal={closeModal}
      orderToUpdate={orderToUpdate}
      updateAnOrder={updateAnOrder}
    />);

    const handleUpdateOrderSpy = jest.spyOn(wrapper.instance(), 'handleUpdateOrder');

    wrapper.instance().handleUpdateOrder();
    expect(handleUpdateOrderSpy).toHaveBeenCalledTimes(1);
  });

  test('should map state to props', () => {
    const ownProps = { previousOrders: orders };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
