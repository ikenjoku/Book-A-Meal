import React from 'react';
import { shallow } from 'enzyme';
import Menu from '../../../components/Menu/Menu';

describe('Menu: Menu Component', () => {
  let wrapper;
  test('Should render Menu Component corectly', () => {
    wrapper = shallow(<Menu />);
    expect(wrapper).toMatchSnapshot();
  });
});
