import React from 'react';
import { shallow } from 'enzyme';
import { CreateMenu ,mapStateToProps } from '../../../components/SetupMenu/CreateMenu';
import initialState from '../../../reducers/initialState'
import { meals } from '../../mocks';

describe('CreateMenu Component', () => {
  let wrapper, closeModal, setAMenu, getAMeals, isFetching, isCreating, selectedDate;
  setAMenu = jest.fn();
  getAMeals = jest.fn();
  closeModal = jest.fn();
  isFetching = false;
  isCreating = false;
  selectedDate = '2018-09-23';

  test('should render CreateMenu correctly', () => {
    wrapper = shallow(
      <CreateMenu
      setAMenu={setAMenu}
      getAMeals={getAMeals}
      closeModal={closeModal}
      meals={meals}
      isFetching={isFetching}
      isCreating={isCreating}
      />);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render Loading when fetching meals', () => {
    wrapper = shallow(
      <CreateMenu
      setAMenu={setAMenu}
      getAMeals={getAMeals}
      closeModal={closeModal}
      meals={meals}
      isFetching={true}
      isCreating={isCreating}
      />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should handleSubmit when called with mealIds', () => {
    wrapper = shallow(
      <CreateMenu
      setAMenu={setAMenu}
      getAMeals={getAMeals}
      closeModal={closeModal}
      meals={meals}
      isFetching={false}
      isCreating={isCreating}
      />);

    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );

    wrapper.instance().handleSubmit([1, 2, 3]);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
  });

  test('should map state to props', () => {
    const ownProps = { 
      meals:{meals},
      isCreating: {isCreating}
    };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
