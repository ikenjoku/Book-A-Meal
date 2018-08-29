import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Modal from 'react-modal';
import modalStyle from '../../utils/modalStyle'
import PlaceOrder from './PlaceOrder.jsx';
import { orderAMeal } from "../../actions/orderActions.js";

export class MenuList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      mealId: undefined,
    }
  }

  handleOrder = (order) => {
    this.props.orderAMeal(order);
  }

  handleOpenModal = ({ mealId }) => {
    this.setState(() => ({ mealId, isOpen: true }));
  }

  handleCloseModal = () => {
    this.setState(() => ({ isOpen: false }));
  }

  render() {
    const { menu, isLoadingMenu } = this.props;
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
                <button
                  className="food-add-btn"
                  onClick={() => { this.handleOpenModal({ mealId: meal.id }) }}
                >
                  Place Order
                </button> :
                <p className='order-btn-text'>Place order from today's menu</p>}</div>
            </div>
          ) : <p className='error-alert'>No meals has been added to this menu.</p>}
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="place-order"
          style={modalStyle}
          ariaHideApp={false}
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

export const mapStateToProps = state => ({
  menu: state.menuReducer.selectedMenu,
  isLoadingMenu: state.menuReducer.isLoading,
});

export default connect(mapStateToProps, { orderAMeal })(MenuList);
