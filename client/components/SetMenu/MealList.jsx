import React from 'react';
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { addAMealToMenu } from '../../actions/setMenuActions';


const MealList = ({ meals, isLoading, selectedDate, dispatch }) => {
    return (
        <div className="contain-set-menu-meal-table">
            <div className="set-menu-table-headers">
                <p>Image</p>
                <p>Name</p>
                <p>Description</p>
                <p>Action</p>
            </div>
            {
                isLoading ? <div className='loading-spinner'>
                <Loader 
                    type="Circles"
                    color="#9D2401"
                    height="100"
                    width="100"
                />
                <h3 id='loader-text'>Fetching...</h3>  
                </div> : 
            <div className="set-menu-table-body">
                {meals.map(meal =>
                    <div key={ meal.id } className="set-menu-meal-item">
                        <img src={ meal.imageurl } alt="" />
                        <div className="food-title-desc">
                            <p className="food-item-title">{ meal.name }</p>
                            <p className="food-item-detail">{ meal.description }</p>
                        </div>
                        <div className="food-item-price">
                        &#8358;{ meal.price }
                        </div>
                        <div><button onClick={() => {
                            dispatch(addAMealToMenu({date:selectedDate, mealId:meal.id}));
                        }} className="food-add-btn">Add to menu</button></div>
                    </div>
                )}
            </div>
            }
        </div>
    );
}

const mapStateToProps = state => ({
    meals: state.mealReducer.meals,
    isLoading: state.mealReducer.isLoading,
    selectedDate: state.setMenuReducer.selectedDate,
});

export default connect(mapStateToProps)(MealList)
