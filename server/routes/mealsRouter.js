import express from 'express';
import mealController from '../controllers/meals';

const mealsRouter = express.Router();

mealsRouter.get('/', mealController.listMeals);
mealsRouter.post('/', mealController.createMeal);

mealsRouter.put('/:id', mealController.updateMeal);
mealsRouter.delete('/:id', mealController.destroyMeal);

export default mealsRouter;
