import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import MenuList from './MenuList';
import DatePicker from '../DatePicker.jsx';
import { getAMenu } from "../../actions/menuActions.js";

class MenuTable extends Component {
  constructor(props){
    super(props);

  }
  componentDidMount(){
    const today = new Date().toISOString().substr(0, 10);
    const selectedDate = '2018-06-19'
    this.props.dispatch(getAMenu({ selectedDate }));
  }
  render(){
    const { menu } = this.props;
     
    
    return (
      
      <div>
        
        <h2 className="center cool-lg-text">Menu List</h2>
        <DatePicker onSubmit={
          () => dispatch(getAMenu({selectedDate, formattedDate}))
        } />
         { menu ?
        <MenuList meals={this.props.menu.Meals} />
        : ''}
      </div>
    );
    
  }
  }

  MenuTable.propTypes = {
    menu: PropTypes.object
  }

const mapStateToProps = state => ({
  menu: state.menuReducer.selectedMenu,
  isLoadingMenu: state.menuReducer.isLoading,
});

export default connect(mapStateToProps)(MenuTable);
