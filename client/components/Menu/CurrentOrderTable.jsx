import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import CancelOrder from './CancelOrder.jsx';
import UpdateOrder from './UpdateOrder.jsx';
import { cancelAnOrder, modifyOrderStatus } from "../../actions/orderActions";

class CurrentOrderTable extends Component{
  constructor(props){
    super(props)
    this.state = {
      openCancelModal: false,
      openUpdateModal: false,
      orderId: undefined,
      orderToUpdate: undefined,
    }
  }
  openCancelModal = ({ orderId }) => {
    this.setState(() => ({ orderId, openCancelModal: true }));
  }

  closeCancelModal = () => {
    this.setState(() => ({ openCancelModal: false }));
  }

  handleOrderUpdate = (orderToUpdate) => {
    this.setState(() => ({ orderToUpdate, openUpdateModal: true }))
  }

  closeUpdateModal = () => {
    this.setState(() => ({ openUpdateModal: false }));
  }

  render(){
    const { currentOrders, changeOrderStatus, cancelAnOrder, modifyOrderStatus, orderIdToModify } = this.props;
    const pendingOrders = currentOrders.filter(order => order.status === 'pending');
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

    return (
    <div>
      <h4>Current Order</h4>
      {pendingOrders.length === 0 ? <p>No current orders</p> :
        pendingOrders.map(order =>
          <div key={order.id} className="order-item">
            <div className="order-item-name">{order.Meal.name}</div>
            <div className="order-item-amount">&#8358; {order.amount}</div>
            <div className="order-item-actions">
              <button 
                className={changeOrderStatus && orderIdToModify === order.id ? 'highlight-btn' : undefined} 
                onClick={() => { 
                  this.handleOrderUpdate(order);
                  modifyOrderStatus(!changeOrderStatus, order.id); 
                }}
              >
                <i className='far fa-edit'></i>
              </button>
              <button 
                className='cancel-order-icon' 
                onClick={() => { 
                  this.openCancelModal({ orderId: order.id });
                }}
              >
                <i className="far fa-times-circle 5x"></i>
              </button> 
            </div>
          </div>
        )}
      <hr />
      <Modal
        isOpen={this.state.openCancelModal}
        contentLabel="cancel-order"
        style={modalStyle}
      >
        <div className="close-icon"> <button
          onClick={this.closeCancelModal}
        ><i className="fas fa-times fa-2x"></i></button></div>
          <CancelOrder
           closeModal={this.closeCancelModal}
           orderId={this.state.orderId} 
           />
        </Modal>
        <Modal
          isOpen={this.state.openUpdateModal}
          contentLabel="update-order"
          style={modalStyle}
        >
          <div className="close-icon"> <button
            onClick={this.closeUpdateModal}
          ><i className="fas fa-times fa-2x"></i></button></div>
            <UpdateOrder
            closeModal={this.closeUpdateModal}
            orderToUpdate={this.state.orderToUpdate} 
            />
        </Modal>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  currentOrders: state.orderReducer.previousOrders,
  changeOrderStatus: state.orderReducer.changeOrderStatus,
  orderIdToModify: state.orderReducer.orderIdToModify

});

export default connect(mapStateToProps, { cancelAnOrder, modifyOrderStatus })(CurrentOrderTable);