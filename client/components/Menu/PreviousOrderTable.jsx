import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllPreviousOrders } from "../../actions/orderActions";


class PreviousOrderTable extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getAllPreviousOrders();
  }

  render(){
    console.log(this.props.previousOrders);
    return (
    <div>
      <h4>Previous orders</h4>
      {this.props.previousOrders.length === 0 ? <p>No order history</p> :
        this.props.previousOrders.map(previousOrder =>
        <div key={previousOrder.id} className="order-item">
          <div className="order-item-qty">{previousOrder.date}</div>
          <div className="order-item-name">{previousOrder.Meal.name}</div>
          <div className="order-item-price">&#8358; {previousOrder.amount} </div>
        </div>
        )}
    </div>
    );
}
}

const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoading,
  previousOrders: state.orderReducer.previousOrders,
});

export default connect(mapStateToProps, { getAllPreviousOrders })(PreviousOrderTable);
