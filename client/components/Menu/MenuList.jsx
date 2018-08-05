import React from 'react';

const MenuList = ({ menu, handleOrder, user, changeOrderStatus, handleModifyOrder, orderIdToModify }) => (
  <div>
    {menu.Meals.length > 0 ? 
    menu.Meals.map(meal =>
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
      <button className='order-meal-btn' onClick={() => {
        if(changeOrderStatus === false){
          handleOrder({mealId:meal.id, id:user.id, meal})
        } else {
          handleModifyOrder({newMealId: meal.id, id: orderIdToModify})
        }
        }} className="food-add-btn">Order</button> : <p className='order-btn-text'>Place order from today's menu</p>}</div>
      </div>
    ) : <p className='error-alert'>No meals has been added to this menu.</p> }
  </div>
);

export default MenuList;