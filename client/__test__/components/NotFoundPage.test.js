import React from 'react';
import { shallow } from "enzyme";
import NotFoundPage from "../../components/NotFound.jsx";


test('it should render 404 Page correctly', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});