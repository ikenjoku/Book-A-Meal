import express from 'express';
import mealController from '../controllers/meals';

const mealsRouter = express.Router();

mealsRouter.get('/', mealController.listMeals);
mealsRouter.post('/', mealController.createMeal);

mealsRouter.put('/:mealId', mealController.updateMeal);
mealsRouter.delete('/:mealId', mealController.destroyMeal);

export default mealsRouter;
