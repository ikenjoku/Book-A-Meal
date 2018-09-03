import React from 'react';
import { shallow } from 'enzyme';
import { menus } from '../../mocks';
import initialState from '../../../reducers/initialState';
import { MenuList, mapStateToProps } from '../../../components/Menu/MenuList';

describe('Menu: Menu Component', () => {
  let wrapper;
  const menu = menus[1];
  const isLoadingMenu = false;
  const orderAMeal = jest.fn();

  test('Should render Menu correctly', () => {
    wrapper = shallow(<MenuList
      menu={menu}
      isLoadingMenu={isLoadingMenu}
      orderAMeal={orderAMeal}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  test("Should only show order button on the current day's menu", () => {
    wrapper = shallow(<MenuList
      menu={menus[0]}
      isLoadingMenu={isLoadingMenu}
      orderAMeal={orderAMeal}
    />);
    expect(wrapper.find('.order-meal-btn').length).toBe(0);
    expect(wrapper.find('.order-btn-text').length).toBe(3);
  });

  test('Should show a notice when there are no meals in the menu', () => {
    const menu = menus[1];
    menu.Meals = [];
    wrapper = shallow(<MenuList
      menu={menu}
      isLoadingMenu={isLoadingMenu}
      orderAMeal={orderAMeal}
    />);
    expect(wrapper.find('.error-alert').length).toBe(1);
  });

  test('should handleOrder when order button is clicked', () => {
    wrapper = shallow(<MenuList
      menu={menus[1]}
      isLoadingMenu={isLoadingMenu}
      orderAMeal={orderAMeal}
    />);
    const handleOrderSpy = jest.spyOn(wrapper.instance(), 'handleOrder');
    const order = { mealId: 30, quantity: 2 };
    wrapper.instance().handleOrder(order);
    expect(handleOrderSpy).toHaveBeenCalledTimes(1);
  });

  test('should close place order modal when No button is clicked', () => {
    wrapper = shallow(<MenuList
      menu={menus[1]}
      isLoadingMenu={isLoadingMenu}
      orderAMeal={orderAMeal}
    />);
    const handleCloseModalSpy = jest.spyOn(wrapper.instance(), 'handleCloseModal');
    wrapper.instance().handleCloseModal();
    expect(handleCloseModalSpy).toHaveBeenCalledTimes(1);
  });

  test('should place order modal when place-order button is clicked', () => {
    wrapper = shallow(<MenuList
      menu={menus[1]}
      isLoadingMenu={isLoadingMenu}
      orderAMeal={orderAMeal}
    />);
    const handleOpenModalSpy = jest.spyOn(wrapper.instance(), 'handleOpenModal');
    wrapper.instance().handleOpenModal({ mealId: 30 });
    expect(handleOpenModalSpy).toHaveBeenCalledTimes(1);
  });

  test('should map state to props', () => {
    const ownProps = { menu: menus[1], isLoadingMenu: false };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
