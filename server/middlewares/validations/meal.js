import Joi from 'joi';
import validate from 'express-validation';

const name = Joi.string().min(2).max(30);
const description = Joi.string().min(5).max(100);
const price = Joi.number().min(1).positive();
const mealId = Joi.number().positive();

export const validateMealCreate = validate({
  body: {
    name: name.required(),
    description: description.required(),
    price: price.required(),
  },
});

export const validateMealUpdate = validate({
  params: {
    mealId,
  },
  body: {
    name: name.required(),
    description: description.required(),
    price: price.required(),
  },
});
