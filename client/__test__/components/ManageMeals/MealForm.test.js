import React from 'react';
import { shallow } from 'enzyme';
import MealForm from '../../../components/ManageMeals/MealForm';
import { meals } from '../../mocks';

describe('MealForm Component', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();
  test('it should render the MealForm correctly', () => {
    wrapper = shallow(<MealForm onSubmit={onSubmit}/>);
    expect(wrapper).toMatchSnapshot();
  });
  
  test('it should render the MealForm with data correctly', () => {
    wrapper = shallow(<MealForm meal={meals[1]}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onFormInput when input fields change value', () => {
    const wrapper = shallow(<MealForm onSubmit={onSubmit} />);
    const onFormInputSpy = jest.spyOn(
      wrapper.instance(), 'onFormInput'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'Eja nla',
        name: 'name'
      }
    };
    wrapper.instance().onFormInput(event);
    expect(onFormInputSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onFormInput when file is uploaded', () => {
    const wrapper = shallow(<MealForm onSubmit={onSubmit} />);
    const onFormInputSpy = jest.spyOn(
      wrapper.instance(), 'onFormInput'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: [{name: 'mypix.jpg'}],
        name: 'imageurl'
      }
    };
    wrapper.instance().onFormInput(event);
    expect(onFormInputSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onFormSubmit when form is submited with valid complete data', () => {
    const wrapper = shallow(<MealForm onSubmit={onSubmit} meal={meals[1]} />);
    const onFormSubmitSpy = jest.spyOn(
      wrapper.instance(), 'onFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().onFormSubmit(event);
    expect(onFormSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should set error when onFormSubmit is called with invalid data', () => {
    const wrapper = shallow(<MealForm onSubmit={onSubmit} meal={{name: 'Fish Nose'}} />);
    const onFormSubmitSpy = jest.spyOn(
      wrapper.instance(), 'onFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().onFormSubmit(event);
    expect(onFormSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
