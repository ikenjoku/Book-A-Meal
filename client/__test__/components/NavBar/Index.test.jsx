import React from 'react';
import { shallow } from 'enzyme';
import { Index, mapStateToProps } from '../../../components/NavBar/Index.jsx';
import initialState from '../../../reducers/initialState';
import { testUsers } from '../../mocks';

describe('NavBar: Index Component', () => {
  let wrapper, isLoggedIn, user;
  isLoggedIn = false
  user = testUsers[0];

  test('should render NavBar correctly when logged out', () => {
    wrapper = shallow(
      <Index
        user={{}}
        isLoggedIn={isLoggedIn}
      />);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render NavBar correctly when customer is logged in', () => {
    wrapper = shallow(
      <Index
        user={testUsers[1]}
        isLoggedIn={true}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render NavBar correctly when admin is logged in', () => {
    wrapper = shallow(
      <Index
        user={testUsers[0]}
        isLoggedIn={true}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  // it('should handle toggleNav call when hamburger icon is clicked', () => {
  //   wrapper = shallow(
  //     <Index
  //       user={testUsers[1]}
  //       isLoggedIn={true}
  //     />);

  //   const toggleNavSpy = jest.spyOn(
  //     wrapper.instance(), 'toggleNav'
  //   );
  //   const event = {};
  //   wrapper.instance().toggleNav(event);
  //   expect(toggleNavSpy).toHaveBeenCalledTimes(1);
  // });
  
  test('should map state to props', () => {
    const ownProps = { isLoggedIn: true, user: testUsers[0] };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});