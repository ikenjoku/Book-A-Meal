import React from 'react';
import { shallow } from 'enzyme';
import { OrderHistory } from '../../../components/OrderHistory/OrderHistory';

describe('OrderHistory Component', () => {
  let wrapper;
  const getOrdersByDate = jest.fn();

  test('should render the OrderHistory correctly', () => {
    wrapper = shallow(<OrderHistory getOrdersByDate={getOrdersByDate} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('DatePicker should handle onSubmit', () => {
    wrapper.find('DatePicker').prop('onSubmit')('2018-08-08');
    expect(getOrdersByDate).toHaveBeenLastCalledWith('2018-08-08');
  });
});
