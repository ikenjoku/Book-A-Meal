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
    this.props.getAMeals();
  }

  async handleSubmit (values) {
    await this.props.setAMenu(values);
    return this.props.closeModal();
  }

  render() {
    const {
      meals, error, isCreating, isFetching,
    } = this.props;

    return (
      <div>
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
          />}
      </div>
    );
  }
}

// CreateMenu.propTypes = {
//   setMenu: PropTypes.func.isRequired,
//   meals: PropTypes.arrayOf(PropTypes.object).isRequired,
//   fetchMeals: PropTypes.func.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   isSaving: PropTypes.bool.isRequired,
//   closeModal: PropTypes.func.isRequired,
// };

const mapStateToProps = state => ({
  error: state.setupMenuReducer.error,
  meals: state.setupMenuReducer.meals,
  isFetching: state.setupMenuReducer.isFetching,
  isCreating: state.setupMenuReducer.isCreating,
});

export default connect(mapStateToProps, { getAMeals, setAMenu })(CreateMenu);