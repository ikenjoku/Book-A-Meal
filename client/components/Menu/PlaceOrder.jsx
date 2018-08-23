import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuantityField from './QuantityField';
class PlaceOrder extends Component {
  state = {
    quantity: 1,
    mealId: this.props.mealId,
  }

  handleChange = (event) => {
    const quantity = event.target.value;
    this.setState(() => ({ quantity}));
  }

  handleConfirmOrder = () => {
    const { mealId, quantity } = this.state;
    this.props.handleOrder({ mealId, quantity });
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
  handleOrder: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  mealsInMenu: state.menuReducer.selectedMenu.Meals,
});
export default connect(mapStateToProps, null)(PlaceOrder);