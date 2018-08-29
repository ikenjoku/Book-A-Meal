import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapStateToProps } from '../../../components/Auth/Login';
import initialState from '../../../reducers/initialState';
import { orders } from '../../mocks';

describe('Login Component', () => {
  let wrapper, loginAUser, isLoggedIn, authLoading;
  loginAUser = jest.fn();
  isLoggedIn = false
  authLoading = false;

  test('it should render Login form correctly', () => {
    wrapper = shallow(
      <Login
        loginAUser={loginAUser}
        isLoggedIn={isLoggedIn}
        authLoading={authLoading}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onFormInput when input fields change value', () => {
    wrapper = shallow(
      <Login
        loginAUser={loginAUser}
        isLoggedIn={isLoggedIn}
        authLoading={authLoading}
      />);

    const onFormInputSpy = jest.spyOn(
      wrapper.instance(), 'onFormInput'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'chubby@gmail.com',
        name: 'email'
      }
    };
    wrapper.instance().onFormInput(event);
    expect(onFormInputSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle onSubmit call when form is submitted', () => {
    wrapper = shallow(
      <Login
        loginAUser={loginAUser}
        isLoggedIn={isLoggedIn}
        authLoading={authLoading}
      />);

    const onSubmitSpy = jest.spyOn(
      wrapper.instance(), 'onSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'chubby@gmail.com',
        name: 'email'
      }
    };
    wrapper.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should redirect to menu page if user signs in', () => {
    wrapper = shallow(
      <Login
        loginAUser={loginAUser}
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
