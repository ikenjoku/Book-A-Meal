import React from "react";
import Modal from 'react-modal';

const EditMeal = ({ selectedToUpdate, mealToUpdate, clearUpdateModal }) => {
  return (
    <Modal
      isOpen={!!selectedToUpdate}
      contentLabel='Update a meal'
      onRequestClose={clearUpdateModal}
    >
        <h3 className="center">Update a Meal <button onClick={clearUpdateModal}>close</button></h3>
        <div className="contain-form">
          <form 
          encType='multipart/form-data' 
          name = 'addMealForm' 
          className="add-meal-form">
            <input
              className="form-control"
              type="text"
              name="name"
              required
              placeholder={mealToUpdate.name} />

            <input
              className="form-control"
              type="text"
              name="description"
              required
              placeholder={mealToUpdate.description} />

            <input
              className="form-control"
              type="number"
              name="price"
              required
              placeholder={mealToUpdate.price} />

            <input
              className="form-control"
              type="file"
              required
              name="imageurl"/>

            <input
              className="btn-control loginsubmitBtn"
              type="submit"
              name='submitBtn'
              value="Add Meal" />

          </form>
        </div>
    </Modal>
  );
}


export default EditMeal;