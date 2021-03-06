import express from 'express';
import userController from '../controllers/users';
import mealController from '../controllers/meals';
import menuController from '../controllers/menu';
import orderController from '../controllers/orders';
import uploadImage from '../helpers/uploadImage';
import authenticate from '../middlewares/authenticate';
import { isAdmin, validateId } from '../middlewares/isAdmin';
import { validateSignup, validateSignin, trimInputs,
  validateMealCreate, validateMealUpdate, authorizeOrders,
  authorizeOrdersUpdate, validateMealChange } from '../middlewares/validateInputs';
import { validateMenuSetup } from '../middlewares/validateMenuSetup';

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

  .get('/menu', authenticate, menuController.getMenu)
  .post('/menu', authenticate, isAdmin, validateMenuSetup, menuController.createMenu)
  .put('/menu/:id', authenticate, isAdmin, validateMenuSetup, menuController.UpdateMenu)


  .get('/orders', authenticate, authorizeOrders, orderController.getOrders)
  .post('/orders', authenticate, orderController.createOrder)
  .put('/orders/:id', validateId, authenticate, authorizeOrdersUpdate, validateMealChange, orderController.updateOrder)
  // catch all 404
  .all('*', (req, res) => res.status(404).send({
    message: 'There is nothing happening here',
  }));

export default router;

