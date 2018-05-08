import { Meal } from '../models';

class MealsController {
  static createMeal(req, res, next) {
    const {
      name,
      description,
      price,
      imgurl,
    } = req.body;
    if (!name || !description || !price || !imgurl) {
      res.status(400).send({
        message: 'Missing Meal Information',
      });
    }
    Meal.create(req.body)
      .then(meal => res.status(201).send({
        meal,
        message: 'Successfully added a new meal',
      }))
      .catch(error => next(error));
  }
  static listMeals(req, res, next) {
    Meal.findAll({})
      .then(meals => res.status(200).send({ meals }))
      .catch(error => next(error));
  }

  static updateMeal(req, res, next) {
    const id = req.params.id;
    delete req.body.id;
    Meal.findById(id)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal not found',
          });
        }
        Meal.update(req.body, {
          where: { id },
          returning: true,
          plain: true,
        })
          .then(updatedMeal => res.status(200).send({
            book: updatedMeal[1],
            message: `${updatedMeal[1].name} was successfully updated`,
          }))
          .catch(error => next(error));
      })
      .catch(error => next(error));
  }

  static removeMeal(req, res, next) {
    const id = req.params.id;
    Meal.destroy({ where: { id } })
      .then(() => res.status(200).send({
        message: 'Successfully deleted meal from database',
      }))
      .catch(error => next(error));
  }
}


export default MealsController;
