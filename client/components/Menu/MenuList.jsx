import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Modal from 'react-modal';
import PlaceOrder from './PlaceOrder.jsx';
import { getAMenu } from "../../actions/menuActions.js";
import { orderAMeal, modifyAnOrder } from "../../actions/orderActions.js";

class MenuList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      mealId: undefined,
    }
  }
  componentDidMount() {
    const today = new Date().toISOString().substr(0, 10);
    this.props.getAMenu({ selectedDate: today });
  }
  handleOrder = (order) => {
    this.props.orderAMeal(order);
  }

  handleModifyOrder = (order) => {
    this.props.modifyAnOrder(order)
  }
  handleOpenModal = ({ mealId }) => {
    this.setState(() => ({ mealId, isOpen: true }));
  }

  handleCloseModal = () => {
    this.setState(() => ({ isOpen: false }));
  }

  render() {
    const modalStyle = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '20rem',
        width: '60%',
        overflow: 'hidden',
      },
    };
    const { menu, isLoadingMenu, error, user, changeOrderStatus, orderIdToModify } = this.props;
    return (
      <div>
        {menu.Meals.length > 0 ?
          menu.Meals.map(meal =>
            <div key={meal.id} className="food-item">
              <div className="meal-table-item-img">
                <img src={meal.imageurl} alt="" />
              </div>
              <div className="food-title-desc">
                <p className="food-item-title">{meal.name}</p>
                <p className="food-item-detail">{meal.description}</p>
              </div>
              <div className="food-item-price">
                &#8358; {meal.price}
              </div>
              <div>{menu.date === new Date().toISOString().substr(0, 10) ?
                <button className='order-meal-btn' onClick={() => {
                  if (changeOrderStatus === false) {
                    this.handleOpenModal({ mealId: meal.id });
                  } else {
                    this.handleModifyOrder({ newMealId: meal.id, id: orderIdToModify })
                  }
                }} className="food-add-btn">Place Order</button> : <p className='order-btn-text'>Place order from today's menu</p>}</div>
            </div>
          ) : <p className='error-alert'>No meals has been added to this menu.</p>}
          <Modal
              isOpen={this.state.isOpen}
              contentLabel="place-order"
              style={modalStyle}
            >
              <div className="close-icon">
               <button
                onClick={this.handleCloseModal}
            ><i className="fas fa-times fa-2x"></i></button></div>
                <PlaceOrder 
                  closeModal={this.handleCloseModal}
                  mealId={this.state.mealId} 
                  handleOrder={this.handleOrder} 
                />
            </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.menuReducer.selectedMenu,
  isLoadingMenu: state.menuReducer.isLoading,
  error: state.menuReducer.error,
  user: state.authReducer.user,
  changeOrderStatus: state.orderReducer.changeOrderStatus,
  orderIdToModify: state.orderReducer.orderIdToModify,
});

export default connect(mapStateToProps, { orderAMeal, getAMenu, modifyAnOrder })(MenuList);
