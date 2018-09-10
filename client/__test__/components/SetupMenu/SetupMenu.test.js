import React from 'react';
import { shallow } from "enzyme";
import { SetupMenu,  } from "../../../components/SetupMenu/SetupMenu";

describe('SetupMenu Component', () => {
  let getAMenu, wrapper, setSelectedDate;
  getAMenu = jest.fn();
  setSelectedDate = jest.fn();

  test('should render the SetupMenu correctly', () => {
    wrapper = shallow(<SetupMenu getAMenu={getAMenu} setSelectedDate={setSelectedDate} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  test('DatePicker should handle onSubmit', () => {
    wrapper.find('DatePicker').prop('onSubmit')('2018-08-08');
    expect(getAMenu).toHaveBeenLastCalledWith('2018-08-08');
  });

  test('DatePicker should handle onChange', () => {
    wrapper.find('DatePicker').prop('onChange')('2018-08-08');
    expect(setSelectedDate).toHaveBeenLastCalledWith('2018-08-08');
  });
});
