import express from 'express';

import userController from '../controllers/users';
import mealController from '../controllers/meals';
import menuController from '../controllers/menu';
import orderController from '../controllers/orders';

import authenticate from '../middlewares/authenticate';
import isAdmin from '../middlewares/isAdmin';
import validateInput from '../middlewares/validateInput';


const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome home, Book_A_Meal');
})
  // Users
  .post('/auth/signup', validateInput.signup, userController.create)
  .post('/auth/login', validateInput.login, userController.login)

  // Meals
  .get('/meals', mealController.listMeals)
  .post('/meals', authenticate, isAdmin, mealController.createMeal)

  .put('/meals/:mealId', authenticate, isAdmin, mealController.updateMeal)
  .delete('/meals/:mealId', authenticate, isAdmin, mealController.removeMeal)

  // Menu
  .get('/menu', menuController.listMenu)
  .post('/menu', authenticate, menuController.createMenu)

  // Orders
  .get('/orders', authenticate, isAdmin, orderController.listOrders)
  .post('/orders', authenticate, orderController.createOrder)
  .put('/orders/:orderId', authenticate, orderController.updateOrder)
  .get('/orders/:date', authenticate, isAdmin, orderController.listOrders)

  // Anywhere else
  .get('*', (req, res) => {
    res.status(404).send({ msg: 'Nothing here to see. Please return to home' });
  });

export default router;
