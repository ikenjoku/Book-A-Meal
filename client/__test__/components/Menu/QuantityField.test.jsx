import React from 'react';
import { shallow } from 'enzyme';
import QuantityField from '../../../components/Menu/QuantityField';

describe('QuantityField Component', () => {
  let wrapper;
  const quantity = 1;
  const handleChange = jest.fn();

  test('should render QuantityField correctly', () => {
    wrapper = shallow(<QuantityField
      quantity={quantity}
      handleChange={handleChange}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
