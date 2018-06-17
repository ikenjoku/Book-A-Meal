import React from 'react';
import { connect } from "react-redux";


const MealList = ({ meals, dispatch }) => {
    return (
        <div className="contain-set-menu-meal-table">
            <div className="set-menu-table-headers">
                <p>Image</p>
                <p>Name</p>
                <p>Description</p>
                <p>Action</p>
            </div>
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
                        <div><button className="food-add-btn">Add to menu</button></div>
                    </div>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    meals: state.mealReducer.meals,
});

export default connect(mapStateToProps)(MealList)
