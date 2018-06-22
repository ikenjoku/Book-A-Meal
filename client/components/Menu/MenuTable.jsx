import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MenuList from './MenuList';
import DatePicker from '../DatePicker.jsx';
import { getAMenu } from "../../actions/menuActions.js";
import { orderAMeal } from "../../actions/orderActions.js";

class MenuTable extends Component {
  constructor(props){
    super(props);

  }
  componentDidMount(){
    const today = new Date().toISOString().substr(0, 10);
    this.props.getAMenu({selectedDate:today});
  }
  render(){
    const { menu } = this.props;
     
    
    return (
      
      <div>
        
        <h2 className="center cool-lg-text">Menu List</h2>
        <DatePicker btnName='Get Menu' onSubmit={
          (selectedDate) => this.props.getAMenu(selectedDate)
        } />
        {this.props.error && <p className='error-alert'>No Menu is set for this day</p> }
         { menu && !this.props.error ?
        <MenuList handleOrder={(mealId) => this.props.orderAMeal(mealId)} menu={this.props.menu} />
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
  error: state.menuReducer.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ orderAMeal, getAMenu }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuTable);
