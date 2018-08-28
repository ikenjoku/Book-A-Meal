import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../../components/DatePicker';

describe('DatePicker Component', () => {
  let wrapper, onChange, onSubmit;
  onChange = jest.fn();
  onSubmit = jest.fn();

  test('should render DatePicker correctly', () => {
    wrapper = shallow(
      <DatePicker
        onChange={onChange}
        onSubmit={onSubmit}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onDateChange when date field is changed', () => {
    wrapper = shallow(
      <DatePicker
        onChange={onChange}
        onSubmit={onSubmit}
      />);

    const onDateChangeSpy = jest.spyOn(
      wrapper.instance(), 'onDateChange'
    );
    const event = {target: {
      value: '2018-06-15',
      name: 'menu-date'
    }}
    wrapper.instance().onDateChange(event);
    expect(onDateChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onFormSubmit when date the form is submitted', () => {
    wrapper = shallow(
      <DatePicker
        onChange={onChange}
        onSubmit={onSubmit}
      />);

    const onFormSubmitSpy = jest.spyOn(
      wrapper.instance(), 'onFormSubmit'
    );
    const event = {preventDefault: jest.fn(0)};
    wrapper.instance().onFormSubmit(event);
    expect(onFormSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
