import React from 'react';
import { shallow } from "enzyme";
import {PlaceOrder, mapStateToProps} from "../../../components/Menu/PlaceOrder";
import initialState from '../../../reducers/initialState'
import { menus } from "../../mocks";

describe('Menu: PlaceOrder Component', () => {
  let wrapper, handleOrder, closeModal;
  handleOrder = jest.fn();
  closeModal = jest.fn();

  test('Should render PlaceOrder correctly', () => {
    wrapper = shallow(
    <PlaceOrder 
      mealsInMenu={menus[1].Meals} 
      handleOrder={handleOrder}
      closeModal={closeModal}
      mealId={{mealId: 30}}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  // test('should map state to props', () => {
  //   const ownProps = { mealsInMenu: menus[1].Meals, error: null, mealId: 30 };
  //   const tree = mapStateToProps(initialState, ownProps);
  //   expect(tree).toMatchSnapshot();
  // });
});

  
