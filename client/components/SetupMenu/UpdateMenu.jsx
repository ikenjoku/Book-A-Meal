import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MealSetupForm from './MealSetupForm';
import { getAMeals, updateAMenu } from '../../actions/setupMenuActions';

class UpdateMenu extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAMeals();
  }

  async handleSubmit(values) {
    await this.props.updateAMenu(values, this.props.menuId);
    return this.props.closeModal();
  }

  render() {
    const {
      meals, error, isUpdating, isFetching,
    } = this.props;

    return (
      <div>
        <h2 className="text-center">Update Menu</h2>
        {isFetching
        ?
          <p>Loading...</p>
        :
          <MealSetupForm
            error={error}
            handleSubmit={this.handleSubmit}
            meals={meals}
            action="Update"
            isSubmitting={isUpdating}
          />}
      </div>
    );
  }
}

// UpdateMenu.propTypes = {
//   modifyMenu: PropTypes.func.isRequired,
//   fetchMeals: PropTypes.func.isRequired,
//   meals: PropTypes.arrayOf(PropTypes.object).isRequired,
//   isUpdating: PropTypes.bool.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   menuId: PropTypes.string.isRequired,
//   /* eslint react/require-default-props: 0 */
//   error: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.objectOf(PropTypes.string),
//   ]),
//   closeModal: PropTypes.func.isRequired,
// };

const mapStateToProps = state => ({
  error: state.setupMenuReducer.error,
  meals: state.setupMenuReducer.meals,
  isUpdating: state.setupMenuReducer.isUpdating,
  isFetching: state.setupMenuReducer.isFetching,
  menuId: state.setupMenuReducer.currentMenu.id,
});

export default connect(mapStateToProps,{ getAMeals, updateAMenu })(UpdateMenu);

