import React, { Component } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import modalStyle from '../../utils/modalStyle';
import { getAMenu } from '../../actions/setupMenuActions';
import CreateMenu from './CreateMenu';
import UpdateMenu from './UpdateMenu';

export class MenuCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  handleOpenModal = () => {
    this.setState(() => ({ isOpen: true }));
  }

  handleCloseModal = () => {
    this.setState(() => ({ isOpen: false }));
  }

  render() {
    const renderedContent = this.props.currentMenu.date ?
      (
        <div className="menu-card">
          <h3>Menu for {moment(this.props.currentMenu.date).format('dddd, MMMM Do YYYY')}</h3>
          <div className="menu-card-meals">
            <ul>
              {
                this.props.currentMenu.Meals.map(meal => <li key={meal.id}>{meal.name}</li>)
              }
            </ul>
          </div>
          <button
            id="open-update-btn"
            onClick={this.handleOpenModal}
          >
            Update Menu
          </button>
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Menu"
            style={modalStyle}
            ariaHideApp={false}
          >
            <div className="close-icon">
              <button
                onClick={this.handleCloseModal}
              >
                <i className="fas fa-times fa-2x" />
              </button>
            </div>
            <UpdateMenu closeModal={this.handleCloseModal} />
          </Modal>
        </div>
      ) :
      (
        <div className="no-menu-card">
          <h3>No Menu has been set for this day</h3>
          <button
            id="open-create-btn"
            onClick={this.handleOpenModal}
          >
            Create Menu
          </button>
          <div>
            <Modal
              isOpen={this.state.isOpen}
              contentLabel="Menu"
              style={modalStyle}
              ariaHideApp={false}
            >
              <div className="close-icon">
                <button
                  onClick={this.handleCloseModal}
                >
                  <i className="fas fa-times fa-2x" />
                </button>
              </div>
              <CreateMenu closeModal={this.handleCloseModal} />
            </Modal>
          </div>
        </div>
      );
    return (
      <div>
        {this.props.isLoadingMenu ?
          <div className="loading-spinner">
            <Loader
              type="Circles"
              color="#9D2401"
              height="100"
              width="100"
            />
            <h3 id="loader-text">Please wait...</h3>
          </div> : renderedContent}
      </div>
    );
  }
}

MenuCard.propTypes = {
  isLoadingMenu: PropTypes.bool.isRequired,
  currentMenu: PropTypes.object.isRequired,
};

export const mapStateToProps = state => ({
  currentMenu: state.setupMenuReducer.currentMenu,
  isLoadingMenu: state.setupMenuReducer.isLoadingMenu,
  selectedDate: state.setupMenuReducer.selectedDate,
});

export default connect(mapStateToProps, { getAMenu })(MenuCard);
