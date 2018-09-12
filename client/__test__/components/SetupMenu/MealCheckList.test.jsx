import React from 'react';
import { shallow } from 'enzyme';
import { meals } from '../../mocks';
import initialState from '../../../reducers/initialState';
import { MealCheckList, mapStateToProps } from '../../../components/SetupMenu/MealCheckList';

describe('MealCheckList Component', () => {
  let wrapper;
  const handleSelect = jest.fn();
  const isFetching = false;

  test('should render MealCheckList correctly', () => {
    wrapper = shallow(<MealCheckList
      meals={meals}
      handleSelect={handleSelect}
      isFetching={isFetching}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Loader while still fetching meals', () => {
    wrapper = shallow(<MealCheckList
      meals={meals}
      handleSelect={handleSelect}
      isFetching={true}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should map state to props', () => {
    const ownProps = {
      meals,
      isFetching: true,
    };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
