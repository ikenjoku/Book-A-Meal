import React from 'react';
import { shallow } from 'enzyme';
import { meals } from '../../mocks';
import initialState from '../../../reducers/initialState';
import { UpdateMenu, mapStateToProps } from '../../../components/SetupMenu/UpdateMenu';

describe('UpdateMenu Component', () => {
  let wrapper;
  const updateAMenu = jest.fn();
  const getAMeals = jest.fn();
  const closeModal = jest.fn();
  const isUpdating = false;
  const selectedDate = '2018-09-23';
  const menuId = 23;

  test('should render UpdateMenu correctly', () => {
    wrapper = shallow(<UpdateMenu
      updateAMenu={updateAMenu}
      getAMeals={getAMeals}
      closeModal={closeModal}
      meals={meals}
      isUpdating={isUpdating}
      selectedDate={selectedDate}
      menuId={menuId}
    />);
    expect(wrapper).toMatchSnapshot();
  });


  it('should handleSubmit when called with mealIds', () => {
    wrapper = shallow(<UpdateMenu
      updateAMenu={updateAMenu}
      getAMeals={getAMeals}
      closeModal={closeModal}
      meals={meals}
      isUpdating={isUpdating}
      selectedDate={selectedDate}
      menuId={menuId}
    />);

    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');

    wrapper.instance().handleSubmit([1, 2, 3]);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
  });

  test('should map state to props', () => {
    const ownProps = {
      meals,
      isUpdating,
    };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
