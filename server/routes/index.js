import express from 'express';

import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';


import userController from '../controllers/users';
import mealController from '../controllers/meals';
import menuController from '../controllers/menu';
import orderController from '../controllers/orders';

// import uploadImage from '../helpers/uploadImage';
import authenticate from '../middlewares/authenticate';
import { isAdmin, validateId, trimInputs } from '../middlewares/isAdmin';
import { validateMealCreate, validateMealUpdate } from '../middlewares/validations/meal';
import { beforeSignup, validateSignup, validateLogin } from '../middlewares/validations/user';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_api_secret,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'bookameal/',
  allowedFormats: ['jpg', 'png', 'gif', 'jpeg'],
  filename: (req, file, cb) => {
    cb(undefined, new Date().toISOString() + file.originalname);
  },
});

const uploadImage = multer({ storage });

const router = express.Router();
router.all('*', trimInputs);
router.get('/', (req, res) => {
  res.status(200).send('Welcome home, Book_A_Meal');
})
  // Users
  .post('/auth/signup', beforeSignup, validateSignup, userController.create)
  .post('/auth/login', validateLogin, userController.login)

  // Meals
  .get('/meals', authenticate, mealController.getMeals)
  .get('/meals/:id', validateId, authenticate, mealController.getMeal)
  .post('/meals', uploadImage.single('imageurl'), validateMealCreate, authenticate, isAdmin, mealController.addMeal)
  .put('/meals/:id', uploadImage.single('imageurl'), validateMealUpdate, validateId, authenticate, isAdmin, mealController.updateMeal)
  .delete('/meals/:id', validateId, authenticate, isAdmin, mealController.removeMeal)

  // Menu
  .get('/menu', menuController.getMenu)
  .post('/menu', authenticate, isAdmin, menuController.createMenu)

  // Orders
  .get('/orders', authenticate, isAdmin, orderController.getAllOrders)
  .get('/orders/date', authenticate, isAdmin, orderController.getOrdersByDate)
  .get('/orders/customer', authenticate, orderController.getOrdersByUser)
  .post('/orders', authenticate, orderController.createOrder)
  .put('/orders/:id', validateId, authenticate, orderController.updateOrder)
  .put('/orders/:id/deliver', authenticate, isAdmin, orderController.deliverOrder)
  // catch all 404
  .get('*', (req, res) => res.status(404).send({
    message: 'Not Found',
  }));

export default router;
