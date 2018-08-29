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
    // wrapper = shallow(
    // <PlaceOrder 
    //   mealsInMenu={menus[1].Meals} 
    //   handleOrder={handleOrder}
    //   closeModal={closeModal}
    //   mealId={{mealId: 31}}
    // />);
    // expect(wrapper).toMatchSnapshot();
  });
});

  
