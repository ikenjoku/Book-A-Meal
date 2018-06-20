import React from 'react';
import fallbackImage from "../../static/mealImg.jpg"


const MenuList = ({ menu }) => (
  <div>
    {menu.Meals.map(meal =>
      <div key={meal.id} className="food-item">
        <div className="meal-table-item-img">
          <img src={meal.imageurl} alt="" />
        </div>
        <div className="food-title-desc">
          <p className="food-item-title">{meal.name}</p>
          <p className="food-item-detail">{meal.description}</p>
        </div>
        <div className="food-item-price">
        &#8358; {meal.price}
        </div>
    <div>{ menu.date === new Date().toISOString().substr(0,10) ?
      <button className="food-add-btn">Order</button> : <p className='order-btn-text'>Place order from today's menu</p>}</div>
      </div>
    )}
  </div>
);



export default MenuList;