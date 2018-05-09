import { Meal } from '../models';

class MealsController {
  static addMeal(req, res) {
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
    Meal.create({
      name,
      description,
      price,
      imgurl,
    })
      .then(meal => res.status(201).send({
        meal,
        message: 'Successfully added a new meal',
      }))
      .catch(error => error);
  }

  static getMeals(req, res) {
    Meal.findAll()
      .then(meals => res.status(200).send({ meals }))
      .catch(error => error);
  }

  static updateMeal(req, res) {
    const { mealId } = req.params;
    delete req.body.id;
    Meal.findById(mealId)
      .then((meal) => {
        if (!meal) {
          return res.status(422).send({
            message: 'Meal does not exist',
          });
        }
        const {
          name,
          description,
          price,
          imgurl,
        } = req.body;
        meal.update({
          name, description, price, imgurl,
        })
          .then((updatedMeal) => {
            res.status(200).send({
              updatedMeal,
              message: 'Successfully updated meal',
            });
          })
          .catch(error => error);
      })
      .catch(error => error);
  }

  static removeMeal(req, res) {
    const { mealId } = req.params;
    Meal.destroy({ where: { id: mealId } })
      .then(() => res.status(204).send({
        message: 'Successfully deleted meal',
      }))
      .catch(error => error);
  }
}


export default MealsController;
