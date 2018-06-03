import React from 'react';

const MealList = ({ meals }) => {
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
                    <div key={meal.id} className="set-menu-meal-item">
                        <img src={require("../../static/mealImg.jpg")} alt="" />
                        <div className="food-title-desc">
                            <p className="food-item-title">Rice and Beans</p>
                            <p className="food-item-detail">Rice, Beans, Plantain, Panla Sauce, Max Coke</p>
                        </div>
                        <div className="food-item-price">
                            N1400
              </div>
                        <div><button className="food-add-btn">Add to menu</button></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MealList;