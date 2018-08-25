import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MealSetupForm from './MealSetupForm';
import { getAMeals, setAMenu } from '../../actions/setupMenuActions';

class CreateMenu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAMeals({limit: 20, page: 1});
  }

  handleSubmit = (values) => {
    this.props.setAMenu(values)
    this.props.closeModal();
  }

  render() {
    const {
      meals, isCreating, isFetching,
    } = this.props;

    return (
      <div className='setup-form'>
        <h2>Create a menu</h2>
        {isFetching
          ?
          <h3>Fetching meals...</h3>
          :
          <MealSetupForm
            handleSubmit={this.handleSubmit}
            meals={meals}
            action="Create"
            isSubmitting={isCreating}
            date={this.props.selectedDate}
          />}
      </div>
    );
  }
}

CreateMenu.propTypes = {
  getAMeals: PropTypes.func.isRequired,
  setAMenu: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  meals: state.setupMenuReducer.meals,
  isFetching: state.setupMenuReducer.isFetching,
  isCreating: state.setupMenuReducer.isCreating,
  selectedDate: state.setupMenuReducer.selectedDate,
});

export default connect(mapStateToProps, { getAMeals, setAMenu })(CreateMenu);