import React from 'react';
import { shallow } from "enzyme";
import { PreviousOrderTable, mapStateToProps } from "../../../components/Menu/PreviousOrderTable";
import initialState from '../../../reducers/initialState';
import { orders } from "../../mocks";


describe('Menu: PreviousOrderTable Component', () => {
  let wrapper, previousOrders;
  previousOrders = orders;

  test('Should render PreviousOrderTable correctly', () => {
    wrapper = shallow(
      <PreviousOrderTable
        previousOrders={orders}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should show a notice when there are no previous orders', () => {
    wrapper = shallow(
      <PreviousOrderTable
        previousOrders={[]}
      />);
      expect(wrapper.find('.no-history-alert').length).toBe(1);
    });

  test('should map state to props', () => {
    const ownProps = { previousOrders: previousOrders };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});