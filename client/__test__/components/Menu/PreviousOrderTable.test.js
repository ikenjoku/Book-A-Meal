import React from 'react';
import { shallow } from "enzyme";
import { PreviousOrderTable } from "../../../components/Menu/PreviousOrderTable";
import { orders } from "../../mocks";

let getAllPreviousOrders, wrapper;

beforeEach(() => {
  getAllPreviousOrders = jest.fn();
  wrapper = shallow(
  <PreviousOrderTable 
    getAllPreviousOrders={getAllPreviousOrders} 
    isLoggedIn={true}
    previousOrders={orders}
  />);
});

test('should render the PreviousOrderTable correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
