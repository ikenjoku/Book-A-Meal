import React from 'react';
import { shallow } from 'enzyme';
import { Signup, mapStateToProps } from '../../../components/Auth/Signup.jsx';
import initialState from '../../../reducers/initialState';
import { orders } from '../../mocks';

describe('Signup Component', () => {
  let wrapper, signupAUser, isLoggedIn, authLoading;
  signupAUser = jest.fn();
  isLoggedIn = false
  authLoading = false;

  test('it should render Signup form correctly', () => {
    wrapper = shallow(
      <Signup
        signupAUser={signupAUser}
        isLoggedIn={isLoggedIn}
        authLoading={authLoading}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onInputChange when input fields change value', () => {
    wrapper = shallow(
      <Signup
        signupAUser={signupAUser}
        isLoggedIn={isLoggedIn}
        authLoading={authLoading}
      />);

    const onInputChangeSpy = jest.spyOn(
      wrapper.instance(), 'onInputChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'chubby@gmail.com',
        name: 'email'
      }
    };
    wrapper.instance().onInputChange(event);
    expect(onInputChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle onSubmit call when form is submitted', () => {
    wrapper = shallow(
      <Signup
        signupAUser={signupAUser}
        isLoggedIn={isLoggedIn}
        authLoading={authLoading}
      />);

    const onSubmitSpy = jest.spyOn(
      wrapper.instance(), 'onSubmit'
    );
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should redirect to menu page if user signs up', () => {
    wrapper = shallow(
      <Signup
        signupAUser={signupAUser}
        isLoggedIn={true}
        authLoading={authLoading}
      />);
      expect(wrapper).toBeDefined();
      expect(wrapper.find('Redirect').length).toBe(1);
      expect(wrapper.find('div').length).toBe(0);
  });

  test('should map state to props', () => {
    const ownProps = { isLoggedIn: false, authLoading: false };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
