import React, { Component } from "react";
import moment from 'moment';
import Modal from 'react-modal';
import { connect } from "react-redux";
import { getAMenu } from "../../actions/setupMenuActions";
import CreateMenu from './CreateMenu';
import UpdateMenu from './UpdateMenu';

class MenuCard extends Component{
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
    }
  }
  handleOpenModal = () => {
    this.setState({ isOpen: true });
  }

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  }

  handleMenuUpdate() {
    this.handleOpenModal();
  }

  render(){

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
          <button
            onClick={this.handleOpenModal}
          >Update Menu</button>
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Menu"
            style={modalStyle}
          >
            <button
              value="&times;"
              onClick={this.handleCloseModal}
              className="close"
            >close</button>
             <UpdateMenu closeModal={this.handleCloseModal} />
          </Modal>
        </div> :
          <div className='no-menu-card'>
            <h3>No Menu has been set for this day</h3>
            <button
              onClick={this.handleOpenModal}
            >Create Menu</button>
            <div>
              <Modal
              isOpen={this.state.isOpen}
              contentLabel="Menu"
              style={modalStyle}
            >
              <button
                value="&times;"
                onClick={this.handleCloseModal}
                className="close"
              >close</button>
                <CreateMenu closeModal={this.handleCloseModal} />
            </Modal>
            </div>
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