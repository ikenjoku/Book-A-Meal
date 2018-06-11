import React from 'react';


const MealList = ({ meals, handleDeleteMeal, handelUpdateMeal }) => {
    return (
        <div>
            <h1 className="meal-table-title">All Meal List</h1>
            <div id="all-meal-table">
                <div className="contain-table-headers">
                    <p>Image</p>
                    <p>Name</p>
                    <p>Description</p>
                    <p>Price</p>
                    <p>Actions</p>
                </div>
                <div className="meal-table">
                    {meals.map(meal =>
                        <div key={meal.id} className="meal-table-item">
                            <div className="meal-table-item-img">
                                <p><img src={require("../../static/mealImg.jpg")} alt="" /></p>
                            </div>
                            <div className="meal-table-item-name">
                                <p>{meal.name}</p>
                            </div>
                            <div className="meal-table-item-desc">
                                <p>{meal.description}</p>
                            </div>
                            <div className="meal-table-item-price">
                                <p>{meal.price}</p>
                            </div>
                            <div className="meal-table-item-action">
                                <p>
                                <a 
                                    className="mg-meal-btn btn-spacer"
                                    onClick={(e) => {
                                        handelUpdateMeal(meal.id);
                                    }}
                                    >
                                    Edit
                                </a>
                                <a 
                                    className="mg-meal-btn btn-danger"
                                    onClick={(e) => {
                                        handleDeleteMeal(meal.id);
                                    }}
                                    >
                                    Delete
                                </a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <hr />
            </div>
        </div>
    );
}

export default MealList;