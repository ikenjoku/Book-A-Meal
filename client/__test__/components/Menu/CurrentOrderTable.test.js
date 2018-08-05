import React from 'react';
import { shallow } from "enzyme";
import { CurrentOrderTable } from "../../../components/Menu/CurrentOrderTable";
import { orders } from '../../mocks';

let cancelAnOrder, modifyOrderStatus, wrapper;

beforeEach(() => {
  cancelAnOrder = jest.fn();
  wrapper = shallow(
  <CurrentOrderTable 
    cancelAnOrder={cancelAnOrder} 
    modifyOrderStatus={modifyOrderStatus}
    currentOrders={orders}
    changeOrderStatus={false}
    orderIdToModify={''}
  />);
});

test('should render the CurrentOrderTable correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should cancel an order when cancel button is clicked', () => {
  wrapper.find('.cancel-order-icon').prop('onClick')(3);
  expect(cancelAnOrder).toHaveBeenLastCalledWith(3);
});