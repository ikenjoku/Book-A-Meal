import React from 'react';
import { shallow } from 'enzyme';
import { MenuTable, mapStateToProps } from '../../../components/Menu/MenuTable';
import initialState from '../../../reducers/initialState';
import { menus } from '../../mocks';

describe('Menu: MenuTable Component', () => {
  let wrapper;
  const menu = menus[1];
  const error = { name: 'New Error' };
  const getAMenu = jest.fn();

  test('Should render MenuTable correctly', () => {
    wrapper = shallow(<MenuTable
      menu={menu}
      error={null}
      getAMenu={getAMenu}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should show a notice when no menu is found', () => {
    wrapper = shallow(<MenuTable
      menu={menus[0]}
      error={error}
      getAMenu={getAMenu}
    />);
    expect(wrapper.find('.error-alert').length).toBe(1);
  });

  test('should map state to props', () => {
    const ownProps = { menu: menus[1], error: null };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
