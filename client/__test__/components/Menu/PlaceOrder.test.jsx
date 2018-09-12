
import React from 'react';
import { shallow } from 'enzyme';
import { meals } from '../../mocks';
import initialState from '../../../reducers/initialState';
import { PlaceOrder, mapStateToProps } from '../../../components/Menu/PlaceOrder';

describe('Menu: PlaceOrder Component', () => {
  let wrapper;
  const handleOrder = jest.fn();
  const closeModal = jest.fn();
  const mealsInMenu = meals;
  const userId = 2;
  const mealId = 1;

  test('should render PlaceOrder correctly', () => {
    wrapper = shallow(<PlaceOrder
      closeModal={closeModal}
      handleOrder={handleOrder}
      mealsInMenu={mealsInMenu}
      userId={userId}
      mealId={mealId}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleChange when input fields change value', () => {
    wrapper = shallow(<PlaceOrder
      closeModal={closeModal}
      handleOrder={handleOrder}
      mealsInMenu={mealsInMenu}
      userId={userId}
      mealId={mealId}
    />);

    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 4,
      },
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle confirm order', () => {
    wrapper = shallow(<PlaceOrder
      closeModal={closeModal}
      handleOrder={handleOrder}
      mealsInMenu={mealsInMenu}
      userId={userId}
      mealId={mealId}
    />);

    const handleConfirmOrderSpy = jest.spyOn(wrapper.instance(), 'handleConfirmOrder');

    wrapper.instance().handleConfirmOrder();
    expect(handleConfirmOrderSpy).toHaveBeenCalledTimes(1);
  });
});
