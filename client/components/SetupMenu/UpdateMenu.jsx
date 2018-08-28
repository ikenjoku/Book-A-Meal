import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MealSetupForm from './MealSetupForm';
import { getAMeals, updateAMenu } from '../../actions/setupMenuActions';

export class UpdateMenu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAMeals({limit: 20, page: 1});
  }

  handleSubmit = (values) => {
    this.props.updateAMenu(values, this.props.menuId)
    this.props.closeModal()
  }

  render() {
    const {
      meals, isUpdating, isFetching,
    } = this.props;

    return (
      <div className='setup-form'>
        <h2>Update Menu</h2>
        {isFetching
          ?
          <p className='loading-update-meals'>Loading...</p>
          :
          <MealSetupForm
            handleSubmit={this.handleSubmit}
            meals={meals}
            action="Update"
            isSubmitting={isUpdating}
            date={this.props.selectedDate}
          />}
      </div>
    );
  }
}

UpdateMenu.propTypes = {
  updateAMenu: PropTypes.func.isRequired,
  getAMeals: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  isUpdating: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  menuId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
};

export const mapStateToProps = state => ({
  meals: state.setupMenuReducer.meals,
  isUpdating: state.setupMenuReducer.isUpdating,
  isFetching: state.setupMenuReducer.isFetching,
  menuId: state.setupMenuReducer.currentMenu.id,
  selectedDate: state.setupMenuReducer.selectedDate,
});

export default connect(mapStateToProps, { getAMeals, updateAMenu })(UpdateMenu);

