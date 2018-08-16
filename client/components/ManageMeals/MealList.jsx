import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

import { getPaginatedMeals } from "../../actions/mealActions.js";
import OptionModal from '../OptionModal';
export class MealList extends Component{

    state = {
      showDeleteModal: undefined,
      mealId: undefined,
      currentPage: 0
    }

    componentDidMount(){
      this.props.getPaginatedMeals(this.state.currentPage);
    }
    handleModalClose = () => {
      this.setState(() => ({
        showDeleteModal: undefined,
        mealId: undefined
      }));
    }
    handleDelete = (id) => {
      const mealToDelete = this.props.paginatedMeals.find(meal => meal.id === id);
      this.setState(() => ({
          showDeleteModal: mealToDelete.name,
          mealId: mealToDelete.id
      }));
    }
    handleNext = () => {
      if(this.props.pages -1 > this.state.currentPage){
        this.props.getPaginatedMeals(this.state.currentPage + 1);
        this.setState((prevState) => ({ currentPage: prevState.currentPage + 1}));
      }
    }
    handlePrevious = () => {
      if(this.state.currentPage > 0){
        this.props.getPaginatedMeals(this.state.currentPage - 1);
        this.setState((prevState) => ({ currentPage: prevState.currentPage - 1}));
      }
    }

    render(){
      let numOfPage;
      let pageNumArr = [];
      numOfPage = this.props.pages || 0;
      for (let pageNum = 0; pageNum < numOfPage ; pageNum++) {
        pageNumArr.push(pageNum + 1);
      }
    return (
      <main className="manage-meals-content">
      <h2 className="center cool-lg-text">Manage Meals</h2>
      <Link className='addMealLink' to={'/meals/create'}><div className='addMealLinkD'>Add a New Meal</div></Link>

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
                this.props.isLoading ? <div className='loading-spinner'>
                <Loader 
                    type="Circles"
                    color="#9D2401"
                    height="100"
                    width="100"
                />
                <h3 id='loader-text'>Fetching...</h3>  
                </div> : 
              <div className="meal-table">
                  { this.props.paginatedMeals && this.props.paginatedMeals.map(meal =>
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
                              to={`/meals/edit/${meal.id}`}
                              className="mg-meal-btn btn-spacer"
                              >
                              Edit
                            </Link>
                            <a 
                              className="mg-meal-btn btn-danger"
                                onClick={ () => { this.handleDelete(meal.id) }
                              }
                              >
                              Delete
                            </a>
                          </p>
                        </div>
                  </div>
                )}
            </div>
              }
            <hr />
            <div className='center'>
              <span onClick={ () => { this.handlePrevious()}}><i className="fas fa-angle-double-left page-btn"></i></span>
              { 
                pageNumArr && pageNumArr.map(num => 
                  <span className={this.state.currentPage === num - 1 ? 'page-num current-page' : 'page-num'} key={num} onClick={() => {
                    this.props.getPaginatedMeals(num - 1);
                    this.setState(() => ({currentPage: num - 1}));
                  }
                }>{num}</span>
              )}
              <span ><i className="fas fa-angle-double-right page-btn" onClick={ () => { this.handleNext()}}></i></span>
            </div>
            <OptionModal
              handleModalClose={this.handleModalClose}
              showDeleteModal={this.state.showDeleteModal}
              mealId={this.state.mealId}
              />
        </div>
      </main>
    );
}
}

 export const mapStateToProps = state => ({
    isLoading: state.mealReducer.isLoading,
    count: state.mealReducer.count,
    pages: state.mealReducer.pages,
    paginatedMeals: state.mealReducer.paginatedMeals,

});

export default connect(mapStateToProps, {getPaginatedMeals})(MealList)
