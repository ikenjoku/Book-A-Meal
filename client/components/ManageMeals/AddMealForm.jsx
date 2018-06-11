import React, { Component } from 'react';


export default class AddMealForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseMessage: '',
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(event){
    event.preventDefault();

    const name = event.target.elements.name.value;
    const description = event.target.elements.description.value;
    const price = event.target.elements.price.value;
    const imageurl = event.target.elements.imageurl.value;
    console.log(imageurl);
    console.log(event.target.elements.imageurl.files[0])
    console.log(new FormData(event.target.elements.imageurl.files[0]))
    const formData = {
      name,
      description,
      price,
      imageurl 
    }
    const responseMessage = this.props.handleCreateMeal(formData);
    // this.setState({ responseMessage });
    console.log(responseMessage);
    const addMealForm = document.forms.addMealForm;
    addMealForm.name.value = '';
    addMealForm.description.value = '';
    addMealForm.price.value = '';
    addMealForm.imageurl.value = '';
    
  }

  render() {
    return (
      <div>
        <h3 className="center">Add a Meal</h3>
    { this.props.responseMessage && <p className='notificationBubble'>{this.state.responseMessage}</p> }
        <div className="contain-form">
          <form 
          encType='multipart/form-data' 
          name = 'addMealForm' 
          onSubmit={this.handleFormSubmit} 
          className="add-meal-form">
            <input
              className="form-control"
              type="text"
              name="name"
              required
              placeholder="Meal Name" />

            <input
              className="form-control"
              type="text"
              name="description"
              required
              placeholder="Short Description" />

            <input
              className="form-control"
              type="number"
              name="price"
              required
              placeholder="Price" />

            <input
              className="form-control"
              type="file"
              required
              name="imageurl"/>

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
