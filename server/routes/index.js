import express from 'express';

import userController from '../controllers/users';
import mealController from '../controllers/meals';
import menuController from '../controllers/menu';
import orderController from '../controllers/orders';

import authenticate from '../middlewares/authenticate';
import { isAdmin, validateId, trimInputs } from '../middlewares/isAdmin';
import { validateMealCreate, validateMealUpdate } from '../middlewares/validations/meal';
import { beforeSignup, validateSignup, validateLogin } from "../middlewares/validations/user";

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
  .post('/meals', validateMealCreate, authenticate, isAdmin, mealController.addMeal)
  .put('/meals/:id', validateMealUpdate, validateId, authenticate, isAdmin, mealController.updateMeal)
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
