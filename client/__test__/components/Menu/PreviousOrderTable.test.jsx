import React from 'react';
import { shallow } from 'enzyme';
import { orders } from '../../mocks';
import { PreviousOrderTable, mapStateToProps } from '../../../components/Menu/PreviousOrderTable';
import initialState from '../../../reducers/initialState';


describe('Menu: PreviousOrderTable Component', () => {
  let wrapper;
  const previousOrders = orders;

  test('Should render PreviousOrderTable correctly', () => {
    wrapper = shallow(<PreviousOrderTable
      previousOrders={previousOrders}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should show a notice when there are no previous orders', () => {
    wrapper = shallow(<PreviousOrderTable
      previousOrders={[]}
    />);
    expect(wrapper.find('.no-history-alert').length).toBe(1);
  });

  test('should map state to props', () => {
    const ownProps = { previousOrders };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
