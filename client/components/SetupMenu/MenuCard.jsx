import React, { Component } from "react";
import moment from 'moment';
import { connect } from "react-redux";
import { getAMenu } from "../../actions/setupMenuActions";


class MenuCard extends Component{
  constructor(props){
    super(props)
  }


  render(){
    const renderedContent = this.props.currentMenu.date ?
        <div className='menu-card'>
        <h3>Menu for { moment(this.props.currentMenu.date).format("dddd, MMMM Do YYYY") }</h3>
          <div className='menu-card-meals'>
          <ul>
            {
              this.props.currentMenu.Meals.map(meal => <li>{ meal.name }</li>)
            }
          </ul>
          </div>
          <button>Update Menu</button>
        </div> :
          <div className='no-menu-card'>
            <h3>No Menu has been set for this day</h3>
            <button>Create Menu</button>
          </div> 
    return(
      <div className=''>
        {renderedContent}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentMenu: state.setupMenuReducer.currentMenu,
    isLoadingMenu: state.setupMenuReducer.isLoadingMenu,
    error: state.setupMenuReducer.error
  }
}

export default connect(mapStateToProps, { getAMenu })(MenuCard);