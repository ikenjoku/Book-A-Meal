import express from 'express';
import userController from '../controllers/users';
import mealController from '../controllers/meals';
import menuController from '../controllers/menu';
import orderController from '../controllers/orders';

import uploadImage from '../helpers/uploadImage';
import authenticate from '../middlewares/authenticate';
import { isAdmin, validateId } from '../middlewares/isAdmin';
import { validateSignup, validateSignin, trimInputs, validateMealCreate, validateMealUpdate } from '../middlewares/validateInputs';

const router = express.Router();
router.all('*', trimInputs);
router.get('/', (req, res) => {
  res.status(200).send('Welcome home, Book_A_Meal');
})
  .post('/auth/signup', validateSignup, userController.create)
  .post('/auth/login', validateSignin, userController.login)

  .get('/meals', authenticate, isAdmin, mealController.getMeals)
  .get('/meals/:id', validateId, authenticate, mealController.getMeal)
  
  .post('/meals', uploadImage.single('imageurl'), validateMealCreate, authenticate, isAdmin, mealController.addMeal)
  .put('/meals/:id', uploadImage.single('imageurl'), validateMealUpdate, validateId, authenticate, isAdmin, mealController.updateMeal)
  .delete('/meals/:id', validateId, authenticate, isAdmin, mealController.removeMeal)

  .get('/menu', menuController.getMenu)
  .post('/menu', authenticate, isAdmin, menuController.createMenu)

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
