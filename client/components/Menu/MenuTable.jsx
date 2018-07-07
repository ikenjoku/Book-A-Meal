import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MenuList from './MenuList';
import DatePicker from '../DatePicker.jsx';
import { getAMenu } from "../../actions/menuActions.js";
import { orderAMeal, modifyAnOrder } from "../../actions/orderActions.js";

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
        { this.props.changeOrderStatus && <p className='error-alert'>Select a new meal</p>}
        {this.props.error && <p className='error-alert'>No Menu is set for this day</p> }
         { menu && !this.props.error ?
        <MenuList 
          handleOrder={(order) => this.props.orderAMeal(order)}
          handleModifyOrder={(order) => this.props.modifyAnOrder(order)}
          changeOrderStatus={this.props.changeOrderStatus}
          orderIdToModify={this.props.orderIdToModify}  
          menu={this.props.menu}
          user={this.props.user} />
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
  error: state.menuReducer.error,
  user: state.authReducer.user,
  changeOrderStatus: state.orderReducer.changeOrderStatus,
  orderIdToModify: state.orderReducer.orderIdToModify
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ orderAMeal, getAMenu, modifyAnOrder }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuTable);
