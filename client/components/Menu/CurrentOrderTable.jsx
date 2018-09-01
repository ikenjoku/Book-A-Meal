import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import modalStyle from '../../utils/modalStyle';
import CancelOrder from './CancelOrder';
import UpdateOrder from './UpdateOrder';
import { getAllPreviousOrders } from '../../actions/orderActions';

export class CurrentOrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCancelModal: false,
      openUpdateModal: false,
      orderId: undefined,
      orderToUpdate: undefined,
    };
  }

  componentDidMount() {
    this.props.getAllPreviousOrders(this.props.userId);
  }

  openCancelModal = ({ orderId }) => {
    this.setState(() => ({ orderId, openCancelModal: true }));
  }

  closeCancelModal = () => {
    this.setState(() => ({ openCancelModal: false }));
  }

  handleOrderUpdate = (orderToUpdate) => {
    this.setState(() => ({ orderToUpdate, openUpdateModal: true }));
  }

  closeUpdateModal = () => {
    this.setState(() => ({ openUpdateModal: false }));
  }

  render() {
    const { currentOrders } = this.props;
    const pendingOrders = currentOrders.filter(order => order.status === 'pending');

    return (
      <div>
        <h4>Current Order</h4>
        {pendingOrders.length === 0 ? <p>No current orders</p> :
          pendingOrders.map(order =>
            (
              <div key={order.id} className="order-item">
                <div className="order-item-name">{order.Meal.name}</div>
                <div className="order-item-amount">&#8358; {order.amount}</div>
                <div className="order-item-actions">
                  <button
                    className="update-order-icon"
                    onClick={() => { this.handleOrderUpdate(order); }}
                  >
                    <i className="far fa-edit" />
                  </button>
                  <button
                    className="cancel-order-icon"
                    onClick={() => {
                      this.openCancelModal({ orderId: order.id });
                    }}
                  >
                    <i className="far fa-times-circle 5x" />
                  </button>
                </div>
              </div>
            ))
          }
        <hr />
        <Modal
          isOpen={this.state.openCancelModal}
          contentLabel="cancel-order"
          style={modalStyle}
          ariaHideApp={false}
        >
          <div className="close-icon">
            <button
              onClick={this.closeCancelModal}
            >
              <i className="fas fa-times fa-2x" />
            </button>
          </div>
          <CancelOrder
            closeModal={this.closeCancelModal}
            orderId={this.state.orderId}
          />
        </Modal>
        <Modal
          isOpen={this.state.openUpdateModal}
          contentLabel="update-order"
          style={modalStyle}
          ariaHideApp={false}
        >
          <div className="close-icon">
            <button
              onClick={this.closeUpdateModal}
            >
              <i className="fas fa-times fa-2x" />
            </button>
          </div>
          <UpdateOrder
            closeModal={this.closeUpdateModal}
            orderToUpdate={this.state.orderToUpdate}
          />
        </Modal>
      </div>
    );
  }
}

CurrentOrderTable.propTypes = {
  currentOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
  getAllPreviousOrders: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  currentOrders: state.orderReducer.previousOrders,
  userId: state.authReducer.user.id,
});

export default connect(mapStateToProps, { getAllPreviousOrders })(CurrentOrderTable);
