import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from '../../../components/NavBar/Navigation';

describe('NavBar: Navigation Component', () => {
  let wrapper;
  const logoutAUser = jest.fn();
  const navLinks = ['Login', 'Signup'];

  test('should render NavBar correctly when logged out', () => {
    wrapper = shallow(<Navigation
      logoutAUser={logoutAUser}
      navLinks={navLinks}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle logout', () => {
    wrapper = shallow(<Navigation
      logoutAUser={logoutAUser}
      navLinks={navLinks}
    />);

    const logoutSpy = jest.spyOn(wrapper.instance(), 'logout');
    wrapper.instance().logout();
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });
});
