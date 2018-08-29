import React from 'react';
import { shallow } from 'enzyme';
import { UpdateMenu ,mapStateToProps } from '../../../components/SetupMenu/UpdateMenu';
import initialState from '../../../reducers/initialState'
import { meals } from '../../mocks';

describe('UpdateMenu Component', () => {
  let wrapper, closeModal, updateAMenu, getAMeals, isUpdating, selectedDate, menuId;
  updateAMenu = jest.fn();
  getAMeals = jest.fn();
  closeModal = jest.fn();
  isUpdating = false;
  selectedDate = '2018-09-23';
  menuId = 23;
  test('should render UpdateMenu correctly', () => {
    wrapper = shallow(
      <UpdateMenu
      updateAMenu={updateAMenu}
      getAMeals={getAMeals}
      closeModal={closeModal}
      meals={meals}
      isUpdating={isUpdating}
      selectedDate={selectedDate}
      />);
    expect(wrapper).toMatchSnapshot();
  });


  it('should handleSubmit when called with mealIds', () => {
    wrapper = shallow(
      <UpdateMenu
      updateAMenu={updateAMenu}
      getAMeals={getAMeals}
      closeModal={closeModal}
      meals={meals}
      isUpdating={isUpdating}
      selectedDate={selectedDate}
      />);

    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );

    wrapper.instance().handleSubmit([1, 2, 3]);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
  });

  test('should map state to props', () => {
    const ownProps = { 
      meals: meals,
      isUpdating: isUpdating
    };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
