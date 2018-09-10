import React from 'react';
import { shallow } from 'enzyme';
import { MenuCard ,mapStateToProps } from '../../../components/SetupMenu/MenuCard';
import initialState from '../../../reducers/initialState'
import { menus } from '../../mocks';

describe('MenuCard Component', () => {
  let wrapper, getAMenu, isLoadingMenu, currentMenu, selectedDate;
  getAMenu = jest.fn();
  isLoadingMenu = false;
  selectedDate = '2018-07-02';
  currentMenu = menus[0]

  test('should render MenuCard correctly', () => {
    wrapper = shallow(
      <MenuCard
      isLoadingMenu={isLoadingMenu}
      getAMenu={getAMenu}
      currentMenu={currentMenu}
      selectedDate={selectedDate}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render a notice card when no menu is set', () => {
    wrapper = shallow(
      <MenuCard
      isLoadingMenu={isLoadingMenu}
      getAMenu={getAMenu}
      currentMenu={{}}
      selectedDate={selectedDate}
      />);
      expect(wrapper.find('.no-menu-card').length).toBe(1);
  });

  test('should render a loader while fetching menu', () => {
    wrapper = shallow(
      <MenuCard
      isLoadingMenu={true}
      getAMenu={getAMenu}
      currentMenu={currentMenu}
      selectedDate={selectedDate}
      />);
      expect(wrapper.find('.loading-spinner').length).toBe(1);
  });

  it('should call handleOpenModal to open modal', () => {
    wrapper = shallow(
      <MenuCard
      isLoadingMenu={isLoadingMenu}
      getAMenu={getAMenu}
      currentMenu={currentMenu}
      selectedDate={selectedDate}
      />);

    const handleOpenModalSpy = jest.spyOn(
      wrapper.instance(), 'handleOpenModal'
    );
    wrapper.instance().handleOpenModal();
    expect(handleOpenModalSpy).toHaveBeenCalledTimes(1);
  });

  it('should call handleCloseModal to close modal', () => {
    wrapper = shallow(
      <MenuCard
      isLoadingMenu={isLoadingMenu}
      getAMenu={getAMenu}
      currentMenu={currentMenu}
      selectedDate={selectedDate}
      />);

    const handleCloseModalSpy = jest.spyOn(
      wrapper.instance(), 'handleCloseModal'
    );
    wrapper.instance().handleCloseModal();
    expect(handleCloseModalSpy).toHaveBeenCalledTimes(1);
  });

  test('should map state to props', () => {
    const ownProps = { 
      isLoadingMenu: false,
      selectedDate: '2018-07-02',
      currentMenu: menus[0],
    };
    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });
});
