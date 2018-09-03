import React from 'react';
import { shallow } from 'enzyme';
import { meals } from '../../mocks';
import initialState from '../../../reducers/initialState';
import { EditMealForm, mapStateToProps } from '../../../components/ManageMeals/EditMealForm';

describe('EditMealForm', () => {
  let wrapper;
  const updateAMeal = jest.fn();
  const history = { push: jest.fn() };

  test('should render the EditMealForm correctly', () => {
    wrapper = shallow(<EditMealForm meal={meals[2]} updateAMeal={updateAMeal} history={history} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should handle onSubmit', () => {
    wrapper.find('MealForm').prop('onSubmit')(meals[2]);
    expect(updateAMeal).toHaveBeenLastCalledWith(2, meals[2]);
    expect(history.push).toHaveBeenCalledWith('/meals');
  });

  test('should map state to props', () => {
    const ownProps = { match: { params: { id: 1 } } };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
