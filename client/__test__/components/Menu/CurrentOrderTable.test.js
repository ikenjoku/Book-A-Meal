import React from 'react';
import { shallow } from "enzyme";
import { CurrentOrderTable, mapStateToProps } from "../../../components/Menu/CurrentOrderTable";
import initialState from '../../../reducers/initialState'
import { orders } from '../../mocks';

describe('Menu: CurrentOrderTable Component', () => {
  let currentOrders, wrapper, userId, getAllPreviousOrders;
  currentOrders = orders;
  userId = 1;
  getAllPreviousOrders = jest.fn();
  test('Should render CurrentOrderTable correctly', () => {
    wrapper = shallow(
      <CurrentOrderTable
        currentOrders={currentOrders}
        userId={userId}
        getAllPreviousOrders={getAllPreviousOrders}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render a message when there are no pending orders', () => {
    wrapper = shallow(
      <CurrentOrderTable
        currentOrders={[orders[0], orders[2]]}
        userId={userId}
        getAllPreviousOrders={getAllPreviousOrders}
      />);
    expect(wrapper.find('.order-item').length).toBe(0);
  });

  test('should handleOrderUpdate  when update button is clicked', () => {
    wrapper = shallow( <CurrentOrderTable 
      currentOrders={currentOrders} 
      userId={userId}
      getAllPreviousOrders={getAllPreviousOrders}
      />);

    const handleOrderUpdateSpy = jest.spyOn(
      wrapper.instance(), 'handleOrderUpdate'
    );
    const orderToUpdate = orders[1]
    wrapper.instance().handleOrderUpdate(orderToUpdate);
    expect(handleOrderUpdateSpy).toHaveBeenCalledTimes(1);
  });

  test('should close update modal when No button is clicked', () => {
    wrapper = shallow( <CurrentOrderTable 
      currentOrders={currentOrders} 
      userId={userId}
      getAllPreviousOrders={getAllPreviousOrders}
      />);

    const closeUpdateModalSpy = jest.spyOn(
      wrapper.instance(), 'closeUpdateModal'
    );
    wrapper.instance().closeUpdateModal();
    expect(closeUpdateModalSpy).toHaveBeenCalledTimes(1);
  });

  test('should openCancelModal when cancel button is clicked', () => {
    wrapper = shallow( <CurrentOrderTable 
      currentOrders={currentOrders} 
      userId={userId}
      getAllPreviousOrders={getAllPreviousOrders}
      />);

    const openCancelModalSpy = jest.spyOn(
      wrapper.instance(), 'openCancelModal'
    );
    wrapper.instance().openCancelModal({ orderId: 2 });
    expect(openCancelModalSpy).toHaveBeenCalledTimes(1);
  });

  test('should close order-cancel modal when No button is clicked', () => {
    wrapper = shallow(<CurrentOrderTable 
      currentOrders={currentOrders} 
      userId={userId}
      getAllPreviousOrders={getAllPreviousOrders}
      />);

    const closeCancelModalSpy = jest.spyOn(
      wrapper.instance(), 'closeCancelModal'
    );
    wrapper.instance().closeCancelModal();
    expect(closeCancelModalSpy).toHaveBeenCalledTimes(1);
  });

  test('should call handleOrderUpdate when Edit button is clicked', () => {
    wrapper = shallow(<CurrentOrderTable 
      currentOrders={currentOrders} 
      userId={userId}
      getAllPreviousOrders={getAllPreviousOrders}
      />);

    const handleOrderUpdateSpy = jest.spyOn(
      wrapper.instance(), 'handleOrderUpdate'
    );
    wrapper.find('.update-order-icon').simulate('click', orders[0]);
    expect(handleOrderUpdateSpy).toHaveBeenCalledTimes(1);
  });

  test('should call openCancelModal when Cancel button is clicked', () => {
    wrapper = shallow(<CurrentOrderTable 
      currentOrders={currentOrders} 
      userId={userId}
      getAllPreviousOrders={getAllPreviousOrders}
      />);

    const openCancelModalSpy = jest.spyOn(
      wrapper.instance(), 'openCancelModal'
    );
    wrapper.find('.cancel-order-icon').simulate('click', {orderId: 2});
    expect(openCancelModalSpy).toHaveBeenCalledTimes(1);
  });

  test('should map state to props', () => {
    const ownProps = { currentOrders: orders };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
