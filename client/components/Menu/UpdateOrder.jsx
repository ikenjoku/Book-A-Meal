import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuantityField from './QuantityField';
import { updateAnOrder } from '../../actions/orderActions';

export class UpdateOrder extends Component {
  state = {
    orderToUpdate: this.props.orderToUpdate,
    quantity: this.props.orderToUpdate.quantity,
    price: this.props.orderToUpdate.Meal.price,
  }

  handleChange = (event) => {
    event.preventDefault();
    const quantity = event.target.value;
    this.setState(() => ({ quantity }));
  }

  handleUpdateOrder = () => {
    const amount = this.state.price * this.state.quantity;
    const orderId = this.state.orderToUpdate.id;
    const userId = this.state.orderToUpdate.User.id;
    const { quantity } = this.state;
    this.props.updateAnOrder({ id: orderId, quantity, amount, userId });
    this.props.closeModal();
  }
  render() {
    const { closeModal } = this.props;

    return (
      <div>
        <h2>Update Order</h2>
        <table id="place-order-table">
          <thead>
            <tr><td>Meal</td><td>Quantity</td><td>Total</td></tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.orderToUpdate.Meal.name}</td>
              <td>
                <QuantityField
                  quantity={this.state.quantity}
                  handleChange={this.handleChange}
                />
              </td>
              <td>&#8358; {this.state.price * this.state.quantity}.00</td>
            </tr>
          </tbody>
        </table>
        <div className="order-btn-container">
          <button id="confirm-update-order" onClick={this.handleUpdateOrder}>Update Order</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    );
  }
}

UpdateOrder.propTypes = {
  closeModal: PropTypes.func.isRequired,
  updateAnOrder: PropTypes.func.isRequired,
  orderToUpdate: PropTypes.object.isRequired,
};

export const mapStateToProps = state => ({
  previousOrders: state.orderReducer.previousOrders,
});

export default connect(mapStateToProps, { updateAnOrder })(UpdateOrder);
