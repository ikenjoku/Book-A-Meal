import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import MenuList from './MenuList';
import DatePicker from '../DatePicker.jsx';
import { getAMenu } from "../../actions/menuActions.js";
import { orderAMeal, modifyAnOrder, modifyOrderStatus } from "../../actions/orderActions.js";

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
      const ordertoModify = this.props.previousOrders.find(order => this.props.orderIdToModify === order.id);
    
    return (
      
      <div>
        <h2 className="center cool-lg-text">Menu</h2>
        <DatePicker btnName='Get Menu' onSubmit={
          (selectedDate) => this.props.getAMenu(selectedDate)
        } />
        { this.props.changeOrderStatus && <p className='popup-notice'>{`Choose a meal to modify ${ordertoModify && ordertoModify.Meal.name} order`}<span><i className="fas fa-times" onClick={() => {this.props.modifyOrderStatus(!this.props.changeOrderStatus)}}></i></span></p>}
        {this.props.error && <p className='error-alert'>No Menu is set for this day</p> }
         { menu && !this.props.error ?
        <MenuList />
        : ''}
      </div>
    );
    
  }
  }

const mapStateToProps = state => ({
  menu: state.menuReducer.selectedMenu,
  error: state.menuReducer.error,
  changeOrderStatus: state.orderReducer.changeOrderStatus,
  orderIdToModify: state.orderReducer.orderIdToModify,
  previousOrders: state.orderReducer.previousOrders
});

export default connect(mapStateToProps, { orderAMeal, getAMenu, modifyAnOrder, modifyOrderStatus })(MenuTable);
