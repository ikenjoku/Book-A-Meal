import React from 'react';
import { shallow } from 'enzyme';
import MealCheckList from '../../../components/SetupMenu/MealCheckList';
import { meals } from '../../mocks';

describe('MealCheckList Component', () => {
  let wrapper, handleSelect;
  handleSelect = jest.fn();

  test('should render MealCheckList correctly', () => {
    wrapper = shallow(
      <MealCheckList
        meals={meals}
        handleSelect={handleSelect}
      />);
    expect(wrapper).toMatchSnapshot();
  });
});
