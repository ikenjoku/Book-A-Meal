import React from 'react';
import { shallow } from 'enzyme';
import QuantityField from '../../../components/Menu/QuantityField';
import { orders } from '../../mocks';

describe('QuantityField Component', () => {
  let wrapper, quantity, handleChange;
  quantity = 1;
  handleChange = jest.fn();

  test('should render QuantityField correctly', () => {
    wrapper = shallow(
      <QuantityField
        quantity={quantity}
        handleChange={handleChange}
      />);
    expect(wrapper).toMatchSnapshot();
  });
});
