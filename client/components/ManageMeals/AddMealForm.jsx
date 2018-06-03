import React, { Component } from 'react';


export default class AddMealForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3 className="center">Add a Meal</h3>
        <div className="contain-form">
          <form className="add-meal-form">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Meal Name" />

            <input
              className="form-control"
              type="text"
              name="descriptiion"
              placeholder="Short Description" />

            <input
              className="form-control"
              type="text"
              name="price"
              placeholder="Price" />

            <input
              className="form-control"
              type="file"
              name="image"
              placeholder="Upload an image" />

            <input
              className="btn-control loginsubmitBtn"
              type="submit"
              value="Add Meal" />

          </form>
        </div>
      </div>
    );
  }
}
