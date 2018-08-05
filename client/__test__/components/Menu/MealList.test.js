import React from 'react';
import { shallow, mount } from "enzyme";
import MealList from "../../../components/Menu/MenuList";

import { menu } from "../../mocks";

let wrapper, handleModifyOrder, handleOrder;

beforeEach(() => {
  handleModifyOrder = jest.fn();
  handleOrder = jest.fn();

  wrapper = mount(<MealList 
    menu={menu} 
    handleOrder={handleOrder} 
    user={{id: 2, isAdmin: true, firstname: 'Ezinne', lastname: 'Njoku' }}
    changeOrderStatus={false}
    handleModifyOrder={handleModifyOrder} 
    orderIdToModify={''}
  />);
});

test('should render the MealList correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
// test('should have 3 meals in menu', () => {
//   // wrapper.find('.order-meal-btn').prop('onClick')({mealId:31, id: 2, meal:menu.Meals[0]});
//   // expect(handleOrder).toHaveBeenCalledWith({mealId:31, id: 2, meal:menu.Meals[0]});
//   expect(wrapper.find(".food-item")).to.have.length(3)
// });
