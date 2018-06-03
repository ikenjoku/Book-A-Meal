import React from 'react';
import fallbackImage from "../../static/mealImg.jpg"


const MealList = ({ meals }) => (
  <div>
    {meals.map(meal =>
      <div key={meal.id} className="food-item">
        <img src={fallbackImage} alt="" />
        <div className="food-title-desc">
          <p className="food-item-title">{meal.name}</p>
          <p className="food-item-detail">{meal.description}</p>
        </div>
        <div className="food-item-price">
          {meal.price}
        </div>
        <div><button className="food-add-btn">Order</button></div>
      </div>
    )}
  </div>
);



export default MealList;