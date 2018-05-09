import express from 'express';

import userController from '../controllers/users';
import mealController from '../controllers/meals';
import menuController from '../controllers/menu';
import orderController from '../controllers/orders';

import authenticate from '../middlewares/authenticate';
import isAdmin from '../middlewares/isAdmin';


const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome home, Book_A_Meal');
})
  // Users
  .post('/auth/signup', userController.create)
  .post('/auth/login', userController.login)

  // Meals
  .get('/meals', mealController.getMeals)
  .post('/meals', authenticate, isAdmin, mealController.addMeal)
  .put('/meals/:mealId', authenticate, isAdmin, mealController.updateMeal)
  .delete('/meals/:mealId', authenticate, isAdmin, mealController.removeMeal)

  // Menu
  .get('/menu', menuController.listMenu)
  .post('/menu', authenticate, isAdmin, menuController.createMenu)

  // Orders
  .get('/orders', authenticate, isAdmin, orderController.listOrders)
  .post('/orders', authenticate, orderController.createOrder)
  .put('/orders/:orderId', authenticate, orderController.updateOrder)
  .get('/orders/:date', authenticate, isAdmin, orderController.listOrders);

export default router;
