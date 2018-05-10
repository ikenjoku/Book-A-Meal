import express from 'express';

import userController from '../controllers/users';
import mealController from '../controllers/meals';
import menuController from '../controllers/menu';
import orderController from '../controllers/orders';

import authenticate from '../middlewares/authenticate';
import { isAdmin, validateSignup, validateLogin, validateId } from '../middlewares/isAdmin';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome home, Book_A_Meal');
})
  // Users
  .post('/auth/signup', validateSignup, userController.create)
  .post('/auth/login', validateLogin, userController.login)

  // Meals
  .get('/meals', mealController.getMeals)
  .post('/meals', authenticate, isAdmin, mealController.addMeal)
  .put('/meals/:mealId', validateId, authenticate, isAdmin, mealController.updateMeal)
  .delete('/meals/:mealId', validateId, authenticate, isAdmin, mealController.removeMeal)

  // Menu
  .get('/menu', menuController.getMenu)
  .post('/menu', authenticate, isAdmin, menuController.postMenu)

  // Orders
  .get('/orders', authenticate, isAdmin, orderController.listOrders)
  .post('/orders', authenticate, orderController.createOrder)
  .put('/orders/:orderId', validateId, authenticate, orderController.updateOrder)

export default router;
