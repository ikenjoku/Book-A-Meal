import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuantityField from './QuantityField';
export class PlaceOrder extends Component {
  state = {
    quantity: 1,
    mealId: this.props.mealId,
  }

  handleChange = (event) => {
    const quantity = event.target.value;
    this.setState(() => ({ quantity}));
  }

  handleConfirmOrder = () => {
    const { mealId } = this.state;
    const userId = this.props.userId;
    const quantity = Number(this.state.quantity)
    this.props.handleOrder({ mealId, quantity, userId });
    this.props.closeModal();
  }
  render() {
    const { mealId, closeModal, mealsInMenu } = this.props;
    const orderMeal = mealsInMenu.find(meal => meal.id === mealId);
    return(
    <div>
      <h2>Place Order</h2>
      <table id="place-order-table">
        <thead>
          <tr><td>Meal</td><td>Quantity</td><td>Total</td></tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderMeal.name}</td>
            <td>
              <QuantityField
                quantity={this.state.quantity}
                handleChange={this.handleChange}
              /></td>
            <td>&#8358; {orderMeal.price * this.state.quantity}.00</td>
          </tr>
        </tbody>
      </table>
      <div className="order-btn-container">
        <button onClick={this.handleConfirmOrder}>Confirm Order</button>
        <button onClick={ closeModal }>Cancel</button>
      </div>
    </div>
    );
  }
}

PlaceOrder.propTypes = {
  mealId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  handleOrder: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export const mapStateToProps = state => ({
  mealsInMenu: state.menuReducer.selectedMenu.Meals,
  userId: state.authReducer.user.id,
});
export default connect(mapStateToProps, null)(PlaceOrder);