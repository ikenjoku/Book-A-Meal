import Joi from 'joi';
import validate from 'express-validation';

const firstname = Joi.string().min(3).max(30);
const lastname = Joi.string().min(3).max(30);
const username = Joi.string().alphanum().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/);
const confirmPassword = Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/);

export const beforeSignup = validate({
  body: {
    firstname: firstname.required(),
    lastname: lastname.required(),
    username: username.required(),
    email: email.required(),
    password: password.required(),
    confirmPassword: confirmPassword.required(),
  },
});

export const validateLogin = validate({
  body: {
    email: email.required(),
    password: password.required(),
  }
});

export const validateSignup = (req, res, next) => {
  if (!(req.body.password === req.body.confirmPassword)) {
    return res.status(400).send({
      message: 'Passwords do not match',
    });
  }
  next();
};