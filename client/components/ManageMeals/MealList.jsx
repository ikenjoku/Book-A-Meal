import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

import { removeAMeal, getAllMeals } from "../../actions/mealActions.js";

class MealList extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.dispatch(getAllMeals());
    }

    render(){
    return (
      <main className="manage-meals-content">
      <h2 className="center cool-lg-text">Manage Meals</h2>
      <Link className='addMealLink' to={'/meals/create'}><div className='addMealLinkD'>Add a New Meal</div></Link>

          <h1 className="meal-table-title">All Meal List</h1>
          <div id="all-meal-table">
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
                  {this.props.meals.map(meal =>
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
                              onClick={(e) => {
                                this.props.dispatch(removeAMeal({id:meal.id}));
                              }}
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
        </div>
      </main>
    );
}
}

const mapStateToProps = state => ({
    meals: state.mealReducer.meals,
    isLoading: state.mealReducer.isLoading,
});

export default connect(mapStateToProps)(MealList)
