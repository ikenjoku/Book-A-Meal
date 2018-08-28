import React from 'react';
import { shallow } from 'enzyme';
import { MealSetupForm ,mapStateToProps } from '../../../components/SetupMenu/MealSetupForm';
import initialState from '../../../reducers/initialState'
import { meals } from '../../mocks';

describe('MealSetupForm Component', () => {
  let wrapper, handleSubmit, action, getAMeals;
  handleSubmit = jest.fn();
  getAMeals = jest.fn();
  action = 'Create';

  test('should render MealSetupForm correctly', () => {
    wrapper = shallow(
      <MealSetupForm
      handleSubmit={handleSubmit}
      getAMeals={getAMeals}
      action={action}
      meals={meals}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSelect when a meal is checked', () => {
    wrapper = shallow(
      <MealSetupForm
      handleSubmit={handleSubmit}
      getAMeals={getAMeals}
      action={action}
      meals={meals}
    />);

    const handleSelectSpy = jest.spyOn(
      wrapper.instance(), 'handleSelect'
    );
    const event = {target: {
      checked: true,
      value: 5,
    }}
    wrapper.instance().handleSelect(event);
    expect(handleSelectSpy).toHaveBeenCalledTimes(1);
  });

  it('should call handleSelect when a meal is checked', () => {
    wrapper = shallow(
      <MealSetupForm
      handleSubmit={handleSubmit}
      getAMeals={getAMeals}
      action={action}
      meals={meals}
    />);

    const handleSelectSpy = jest.spyOn(
      wrapper.instance(), 'handleSelect'
    );
    const event = {target: {
      checked: false,
      value: 5,
    }}
    wrapper.instance().handleSelect(event);
    expect(handleSelectSpy).toHaveBeenCalledTimes(1);
  });

  it('should handleSubmit when called with mealIds', () => {
    wrapper = shallow(
      <MealSetupForm
      handleSubmit={handleSubmit}
      getAMeals={getAMeals}
      action={action}
      meals={meals}
    />);

    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleSubmit'
    );
    const event = {preventDefault : jest.fn()};
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should handlePageChange when called with pageNumber', () => {
    wrapper = shallow(
      <MealSetupForm
      handleSubmit={handleSubmit}
      getAMeals={getAMeals}
      action={action}
      meals={meals}
    />);

    const handlePageChangeSpy = jest.spyOn(
      wrapper.instance(), 'handlePageChange'
    );
    wrapper.instance().handlePageChange(2);
    expect(handlePageChangeSpy).toHaveBeenCalledTimes(1);
  });

  test('should map state to props', () => {
    const ownProps = { 
      count:5,
      pages: 2
    };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
