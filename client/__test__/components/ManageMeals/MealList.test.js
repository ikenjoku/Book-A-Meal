import React from 'react';
import { shallow } from "enzyme";
import { MealList, mapStateToProps } from "../../../components/ManageMeals/MealList";
import initialState from '../../../reducers/initialState'
import { meals } from "../../mocks";

describe('ManageMeals: MealList Component', () => {
  let wrapper, getPaginatedMeals, count, pages, paginatedMeals, isLoading;
  count = 5;
  pages = 1;
  paginatedMeals = meals;
  isLoading = false;
  getPaginatedMeals = jest.fn();
  
  test('should render the MealList correctly', () => {
    wrapper = shallow(
      <MealList 
        getPaginatedMeals={getPaginatedMeals} 
        paginatedMeals={paginatedMeals}
        count={count}
        pages={pages}
        isLoading={isLoading}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the spinner correctly when still loading', () => {
    wrapper = shallow(
      <MealList 
        getPaginatedMeals={getPaginatedMeals} 
        paginatedMeals={paginatedMeals}
        count={count}
        pages={pages}
        isLoading={true}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should should show modal when delete button is clicked', () => {
    wrapper = shallow(
      <MealList 
        getPaginatedMeals={getPaginatedMeals} 
        paginatedMeals={paginatedMeals}
        count={count}
        pages={pages}
        isLoading={isLoading}
      />);

    const handleDeleteSpy = jest.spyOn(
      wrapper.instance(), 'handleDelete'
    );
    const mealToDelete = meals[0];
    wrapper.instance().handleDelete(mealToDelete);
    expect(handleDeleteSpy).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  test('should call handleDelete when delete button is clicked', () => {
    const meal = paginatedMeals[0];
    wrapper = shallow(
      <MealList 
        getPaginatedMeals={getPaginatedMeals} 
        paginatedMeals={[meal]}
        count={count}
        pages={pages}
        isLoading={isLoading}
      />);

    const handleDeleteSpy = jest.spyOn(
      wrapper.instance(), 'handleDelete'
    );

    wrapper.find('.mg-meal-btn .btn-danger').simulate('click')
    expect(handleDeleteSpy).toHaveBeenCalledTimes(1);
  });

  test('should should close modal when No button is clicked', () => {
    wrapper = shallow(
      <MealList 
        getPaginatedMeals={getPaginatedMeals} 
        paginatedMeals={paginatedMeals}
        count={count}
        pages={pages}
        isLoading={isLoading}
      />);

    const closeDeleteModalSpy = jest.spyOn(
      wrapper.instance(), 'closeDeleteModal'
    );
    const mealToDelete = meals[0];
    wrapper.instance().handleDelete(mealToDelete);
    wrapper.instance().closeDeleteModal();
    expect(closeDeleteModalSpy).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  test('should should handle page change', () => {
    wrapper = shallow(
      <MealList 
        getPaginatedMeals={getPaginatedMeals} 
        paginatedMeals={paginatedMeals}
        count={count}
        pages={pages}
        isLoading={isLoading}
      />);

    const handlePageChangeSpy = jest.spyOn(
      wrapper.instance(), 'handlePageChange'
    );
    const pageNumber = 1;
    wrapper.instance().handlePageChange(pageNumber);
    expect(handlePageChangeSpy).toHaveBeenCalledTimes(1);
  });

  test('should map state to props', () => {
    const ownProps = { getPaginatedMeals: meals, isLoading: false, count: 5, pages: 1 };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
