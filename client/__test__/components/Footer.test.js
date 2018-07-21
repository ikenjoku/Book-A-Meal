import React from 'react';
import { shallow } from "enzyme";
import Footer from "../../components/Footer.jsx";;


test('it should render footer correctly', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper).toMatchSnapshot();
});