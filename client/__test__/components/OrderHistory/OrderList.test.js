import React from 'react';
import { shallow } from "enzyme";
import { OrderList, mapStateToProps } from "../../../components/OrderHistory/OrderList";
import initialState from '../../../reducers/initialState'
import { orders } from "../../mocks";

describe('OrderList', () => {
  let wrapper, deliverAnOrder, isLoadingOrders;
    deliverAnOrder = jest.fn();
    isLoadingOrders = false;
  
  test('should render the OrderList correctly', () => {
    wrapper = shallow(<OrderList 
      deliverAnOrder={deliverAnOrder} 
      isLoadingOrders={isLoadingOrders} 
      orders={orders} 
      />);
    expect(wrapper).toMatchSnapshot();
  });
  
  test('should render a notice when there are no orders', () => {
    wrapper = shallow(<OrderList 
      deliverAnOrder={deliverAnOrder} 
      isLoadingOrders={isLoadingOrders} 
      orders={[]} 
      />);
      expect(wrapper.find('.error-alert').length).toBe(1);
  });

  test('should render a loader still loading orders', () => {
    wrapper = shallow(<OrderList 
      deliverAnOrder={deliverAnOrder} 
      isLoadingOrders={true} 
      orders={orders} 
      />);
      expect(wrapper.find('Loader').length).toBe(1);
  });

  test('should map state to props', () => {
    const ownProps = { orders: orders, isLoadingOrders: false };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
