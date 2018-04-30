import IndexController from './index';
import Meal from '../model-mocks/meals';

class MealsController extends IndexController {
  static createMeal(req, res) {
    const {
      name,
      description,
      price,
      imageurl,
    } = req.body;
    if (!name || !description || !price || !imageurl) {
      res.status(400).send({
        message: 'Missing Meal Information',
      });
    }
    Meal.push({
      id: Meal[Meal.length - 1].id + 1,
      name,
      description,
      imageurl,
    });
    const newMealIndex = Meal.findIndex(meal => meal.name === req.body.name);
    return res.status(201).send(Meal[newMealIndex]);
  }

  static listMeals(req, res) {
    return res.status(200).send(Meal);
  }

  static updateMeal(req, res) {
    const mealIndex = Meal.findIndex(meal => meal.id === Number(req.params.mealId));
    if (mealIndex === -1) {
      return res.status(404).send({
        message: 'Meal Not Found',
      });
    }
    const updatedMeal = { ...Meal[mealIndex], ...req.body };
    Meal.splice(mealIndex, 1, updatedMeal);
    return res.status(200).send(updatedMeal);
  }

  static destroyMeal(req, res) {
    const mealIndex = Meal.findIndex(meal => meal.id === Number(req.params.mealId));
    if (mealIndex === -1) {
      return res.status(404).send({
        message: 'Meal Not Found',
      });
    }
    Meal.splice(mealIndex, 1);
    return res.status(204).send();
  }
}

export default MealsController;
