import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Pagination from 'react-js-pagination';
import modalStyle from '../../utils/modalStyle';
import DeleteMeal from './DeleteMeal';
import { getPaginatedMeals } from '../../actions/mealActions';

export class MealList extends Component {
  state = {
    openDeleteModal: false,
    mealToDelete: undefined,
    activePage: 1,
  }

  componentDidMount() {
    this.props.getPaginatedMeals({ limit: 5, page: 1 });
  }

  closeDeleteModal = () => {
    this.setState(() => ({
      openDeleteModal: false,
    }));
  }

  handleDelete = (mealToDelete) => {
    this.setState(() => ({
      mealToDelete,
      openDeleteModal: true,
    }));
  }

  handlePageChange = (pageNumber) => {
    const limit = 5;
    this.props.getPaginatedMeals({ limit, page: pageNumber });
    this.setState(() => ({ activePage: pageNumber }));
  }

  render() {
    return (
      <main className="manage-meals-content">
        <h2 className="center cool-lg-text">Manage Meals</h2>
        <Link className="addMealLink" to="/meals/create"><div className="addMealLinkD">Add a New Meal</div></Link>

        <div id="all-meal-table">
          <h1 className="meal-table-title center">All Meal List</h1>
          <div className="contain-table-headers">
            <p>Image</p>
            <p>Name</p>
            <p>Description</p>
            <p>Price</p>
            <p>Actions</p>
          </div>
          {
            this.props.isLoading ?
              <div className="loading-spinner">
                <Loader
                  type="Circles"
                  color="#9D2401"
                  height="100"
                  width="100"
                />
                <h3 id="loader-text">Fetching...</h3>
              </div> :
              <div className="meal-table">
                {this.props.paginatedMeals && this.props.paginatedMeals.map(meal =>
                  (
                    <div key={meal.id} className="meal-table-item">
                      <div className="meal-table-item-img">
                        <p><img src={meal.imageurl} alt="" /></p>
                      </div>
                      <div className="meal-table-item-name">
                        <p>{meal.name}</p>
                      </div>
                      <div className="meal-table-item-desc">
                        <p>{meal.description}</p>
                      </div>
                      <div className="meal-table-item-price">
                        <p>&#8358; {meal.price}</p>
                      </div>
                      <div className="meal-table-item-action">
                        <p>
                          <Link
                            id={`edit-meal-${meal.id}`}
                            to={`/meals/edit/${meal.id}`}
                            className="mg-meal-btn btn-spacer"
                          >
                            Edit
                          </Link>
                          <Link
                            id={`delete-meal-${meal.id}`}
                            to="#"
                            className="mg-meal-btn btn-danger"
                            onClick={() => { this.handleDelete(meal); }
                            }
                          >
                            Delete
                          </Link>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
          }
          <hr />
          <div className="center">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={5}
              totalItemsCount={this.props.count}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
          <Modal
            isOpen={this.state.openDeleteModal}
            contentLabel="delete-order"
            style={modalStyle}
            ariaHideApp={false}
          >
            <div className="close-icon">
              <button
                onClick={this.closeDeleteModal}
              >
                <i className="fas fa-times fa-2x" />
              </button>
            </div>
            <DeleteMeal
              closeModal={this.closeDeleteModal}
              meal={this.state.mealToDelete}
            />
          </Modal>
        </div>
      </main>
    );
  }
}

MealList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  paginatedMeals: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPaginatedMeals: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};


export const mapStateToProps = state => ({
  isLoading: state.mealReducer.isLoading,
  count: state.mealReducer.count,
  paginatedMeals: state.mealReducer.paginatedMeals,

});

export default connect(mapStateToProps, { getPaginatedMeals })(MealList);
